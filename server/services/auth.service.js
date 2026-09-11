const crypto = require('crypto');
const prisma = require('../prisma');

const DEMO_FARMER_PHONE = '9876543210';
const DEMO_STAFF_PHONE = '9876543211';

/**
 * Perform one-click demo login for FARMER or STAFF
 */
async function demoLogin(role = 'FARMER') {
  const normalizedRole = role.toUpperCase() === 'STAFF' ? 'STAFF' : 'FARMER';
  const targetPhone = normalizedRole === 'STAFF' ? DEMO_STAFF_PHONE : DEMO_FARMER_PHONE;

  let user = await prisma.user.findUnique({
    where: { phone: targetPhone },
    include: { farmerProfile: true },
  });

  if (!user) {
    if (normalizedRole === 'STAFF') {
      user = await prisma.user.create({
        data: {
          name: 'Shivapur Center Operator',
          phone: DEMO_STAFF_PHONE,
          phoneNumber: DEMO_STAFF_PHONE,
          email: 'operator.shivapur@krishiyantra.gov.in',
          village: 'Shivapur',
          district: 'Mandya',
          state: 'Karnataka',
          role: 'STAFF',
          aadhaarLast4: '9876',
          aadhaarVerified: true,
          mobileVerified: true,
          verificationStatus: 'VERIFIED',
        },
        include: { farmerProfile: true },
      });
    } else {
      user = await prisma.user.create({
        data: {
          name: 'Ravi Kumar',
          phone: DEMO_FARMER_PHONE,
          phoneNumber: DEMO_FARMER_PHONE,
          email: 'ravi.kumar@krishiyantra.gov.in',
          village: 'Shivapur Taluk',
          district: 'Mandya',
          state: 'Karnataka',
          role: 'FARMER',
          aadhaarLast4: '1234',
          aadhaarVerified: true,
          mobileVerified: true,
          verificationStatus: 'VERIFIED',
          farmerProfile: {
            create: {
              village: 'Shivapur Taluk',
              district: 'Mandya',
              state: 'Karnataka',
              cropType: 'Paddy / Rice',
              language: 'en',
            },
          },
        },
        include: { farmerProfile: true },
      });
    }
  } else {
    // Ensure verified fields are set
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        aadhaarLast4: user.aadhaarLast4 || '1234',
        aadhaarVerified: true,
        mobileVerified: true,
        verificationStatus: 'VERIFIED',
      },
      include: { farmerProfile: true },
    });
  }

  // Strip sensitive aadhaarHash before returning
  const { aadhaarHash, ...sanitizedUser } = user;
  return sanitizedUser;
}

/**
 * Send OTP after validating BOTH Aadhaar Number and Mobile Number with consent
 */
async function sendOtp(payload) {
  // Support both object payload and direct phone argument
  const phone = typeof payload === 'object' ? payload.phone : payload;
  const aadhaar = typeof payload === 'object' ? payload.aadhaar : null;
  const consent = typeof payload === 'object' ? payload.consent : true;

  // 1. Validate Aadhaar Number
  const cleanedAadhaar = String(aadhaar || '').replace(/\D/g, '');
  if (!cleanedAadhaar || cleanedAadhaar.length !== 12) {
    const err = new Error('Please enter a valid 12-digit Aadhaar number.');
    err.statusCode = 400;
    throw err;
  }

  // 2. Validate Mobile Number
  const cleanedPhone = String(phone || '').replace(/\D/g, '').slice(-10);
  if (!cleanedPhone || cleanedPhone.length !== 10) {
    const err = new Error('Please enter a valid 10-digit mobile number.');
    err.statusCode = 400;
    throw err;
  }

  // 3. Validate Consent
  if (consent !== true && consent !== 'true') {
    const err = new Error('Please provide consent to Aadhaar and mobile-based identity verification.');
    err.statusCode = 400;
    throw err;
  }

  // 4. Compute secure SHA-256 hash of Aadhaar (Zero raw Aadhaar stored)
  const aadhaarHash = crypto.createHash('sha256').update(cleanedAadhaar).digest('hex');
  const aadhaarLast4 = cleanedAadhaar.slice(-4);

  // 5. Generate 6-digit OTP (SIH Demo Mode: 123456)
  const demoOtp = '123456';
  const otpHash = crypto.createHash('sha256').update(demoOtp).digest('hex');
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  // 6. Record verification challenge in database
  try {
    await prisma.otpVerification.create({
      data: {
        phone: cleanedPhone,
        otpHash,
        aadhaarLast4,
        attempts: 0,
        expiresAt,
        verified: false,
      },
    });
  } catch (e) {
    // Non-fatal if table write fails
  }

  const maskedPhone = `XXXXX ${cleanedPhone.slice(-5)}`;
  const maskedAadhaar = `XXXX XXXX ${aadhaarLast4}`;

  return {
    success: true,
    phone: cleanedPhone,
    maskedPhone,
    maskedAadhaar,
    aadhaarLast4,
    otp: demoOtp, // Clearly provided for SIH Prototype demonstration
    mode: 'SIH_PROTOTYPE_DEMO',
    message: `OTP sent successfully to registered mobile +91 ${maskedPhone}`,
  };
}

/**
 * Verify OTP and authenticate user
 */
async function verifyOtp(phone, otp, aadhaarLast4 = '1234', role = 'FARMER', name = null) {
  const cleanedPhone = String(phone || '').replace(/\D/g, '').slice(-10);
  if (!cleanedPhone || cleanedPhone.length !== 10) {
    const err = new Error('Please enter a valid 10-digit mobile number.');
    err.statusCode = 400;
    throw err;
  }

  const code = String(otp || '').trim();
  if (!code) {
    const err = new Error('Please enter the 6-digit OTP.');
    err.statusCode = 400;
    throw err;
  }

  // Check OTP challenge against database if available
  try {
    const latestChallenge = await prisma.otpVerification.findFirst({
      where: { phone: cleanedPhone, verified: false },
      orderBy: { createdAt: 'desc' },
    });

    if (latestChallenge) {
      if (latestChallenge.expiresAt < new Date()) {
        const err = new Error('OTP expired. Please request a new OTP.');
        err.statusCode = 400;
        throw err;
      }
      if (latestChallenge.attempts >= 5) {
        const err = new Error('Too many attempts. Please request a new OTP.');
        err.statusCode = 400;
        throw err;
      }

      // Increment attempt
      await prisma.otpVerification.update({
        where: { id: latestChallenge.id },
        data: { attempts: latestChallenge.attempts + 1 },
      });
    }
  } catch (e) {
    if (e.statusCode) throw e;
  }

  // Validate OTP: Accept standard demo code 123456 or legacy 1234
  if (code !== '123456' && code !== '1234') {
    const err = new Error('Incorrect OTP. Please enter demo code 123456.');
    err.statusCode = 400;
    throw err;
  }

  // Mark latest challenge verified
  try {
    const latest = await prisma.otpVerification.findFirst({
      where: { phone: cleanedPhone, verified: false },
      orderBy: { createdAt: 'desc' },
    });
    if (latest) {
      await prisma.otpVerification.update({
        where: { id: latest.id },
        data: { verified: true },
      });
    }
  } catch (e) {}

  // Find or create farmer user
  const user = await findOrCreateUser(cleanedPhone, role, name, aadhaarLast4);
  const { aadhaarHash, ...sanitizedUser } = user;
  return sanitizedUser;
}

/**
 * Direct phone login helper (legacy fallback)
 */
async function loginByPhone(phone, role = 'FARMER', name = null) {
  const cleanedPhone = String(phone || '').replace(/\D/g, '').slice(-10);
  if (!cleanedPhone || cleanedPhone.length !== 10) {
    const err = new Error('Please enter a valid 10-digit mobile number.');
    err.statusCode = 400;
    throw err;
  }

  const user = await findOrCreateUser(cleanedPhone, role, name);
  const { aadhaarHash, ...sanitizedUser } = user;
  return sanitizedUser;
}

/**
 * Find existing user or create a new user profile
 */
async function findOrCreateUser(phone, role = 'FARMER', name = null, aadhaarLast4 = '1234') {
  const normalizedRole = (role || 'FARMER').toUpperCase() === 'STAFF' ? 'STAFF' : 'FARMER';

  let user = await prisma.user.findUnique({
    where: { phone },
    include: { farmerProfile: true },
  });

  if (!user) {
    const defaultName = name || (normalizedRole === 'FARMER' ? `Farmer ${phone.slice(-4)}` : `Staff ${phone.slice(-4)}`);

    user = await prisma.user.create({
      data: {
        name: defaultName,
        phone,
        phoneNumber: phone,
        role: normalizedRole,
        village: 'Shivapur',
        district: 'Mandya',
        state: 'Karnataka',
        aadhaarLast4: aadhaarLast4 || '1234',
        aadhaarVerified: true,
        mobileVerified: true,
        verificationStatus: 'VERIFIED',
        ...(normalizedRole === 'FARMER'
          ? {
              farmerProfile: {
                create: {
                  village: 'Shivapur',
                  district: 'Mandya',
                  state: 'Karnataka',
                  cropType: 'Paddy / Rice',
                  language: 'en',
                },
              },
            }
          : {}),
      },
      include: { farmerProfile: true },
    });
  } else {
    // Keep verified credentials in sync
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        aadhaarLast4: aadhaarLast4 || user.aadhaarLast4 || '1234',
        aadhaarVerified: true,
        mobileVerified: true,
        verificationStatus: 'VERIFIED',
      },
      include: { farmerProfile: true },
    });
  }

  return user;
}

/**
 * Authenticate farmer securely via Aadhaar number alone with consent
 */
async function loginByAadhaar(aadhaar, consent) {
  // 1. Validate Aadhaar Number: exactly 12 digits, digits only
  const cleanedAadhaar = String(aadhaar || '').replace(/\D/g, '');
  if (!cleanedAadhaar || cleanedAadhaar.length !== 12) {
    const err = new Error('Please enter a valid 12-digit Aadhaar number.');
    err.statusCode = 400;
    throw err;
  }

  // 2. Validate Consent
  if (consent !== true && consent !== 'true') {
    const err = new Error('Please provide consent to continue.');
    err.statusCode = 400;
    throw err;
  }

  // 3. Compute secure SHA-256 hash (Never store raw Aadhaar)
  const aadhaarHash = crypto.createHash('sha256').update(cleanedAadhaar).digest('hex');
  const aadhaarLast4 = cleanedAadhaar.slice(-4);

  // 4. In SIH prototype demo mode, associate with demo farmer Ravi Kumar (preserves active booking B-104)
  let user = await prisma.user.findFirst({
    where: { phone: DEMO_FARMER_PHONE },
    include: { farmerProfile: true },
  });

  if (!user) {
    user = await demoLogin('FARMER');
  } else {
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        aadhaarLast4,
        aadhaarHash,
        aadhaarVerified: true,
        verificationStatus: 'VERIFIED',
      },
      include: { farmerProfile: true },
    });
  }

  const { aadhaarHash: _h, ...sanitizedUser } = user;
  return sanitizedUser;
}

module.exports = {
  demoLogin,
  loginByAadhaar,
  sendOtp,
  verifyOtp,
  loginByPhone,
  findOrCreateUser,
  DEMO_FARMER_PHONE,
  DEMO_STAFF_PHONE,
};

