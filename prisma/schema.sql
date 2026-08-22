-- SQL Schema for CareerBuild App (PostgreSQL / Supabase / Neon Compatible)

-- Create Enums
CREATE TYPE "Plan" AS ENUM ('FREE', 'PRO', 'ENTERPRISE');
CREATE TYPE "SkillLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'IN_REVIEW', 'COMPLETED');

-- Users Table
CREATE TABLE "users" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT,
    "email" TEXT UNIQUE NOT NULL,
    "passwordHash" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "plan" "Plan" NOT NULL DEFAULT 'FREE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Password OTPs Table
CREATE TABLE "password_otps" (
    "id" TEXT PRIMARY KEY,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX "password_otps_email_idx" ON "password_otps"("email");

-- Resumes Table
CREATE TABLE "resumes" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "title" TEXT NOT NULL DEFAULT 'Untitled Resume',
    "targetRole" TEXT,
    "templateId" TEXT NOT NULL DEFAULT 'modern',
    "fontFamily" TEXT NOT NULL DEFAULT 'Inter',
    "accentColor" TEXT NOT NULL DEFAULT '#3b82f6',
    "layout" TEXT NOT NULL DEFAULT 'single-column',
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT UNIQUE,
    "atsScore" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Personal Info Table
CREATE TABLE "personal_info" (
    "id" TEXT PRIMARY KEY,
    "resumeId" TEXT UNIQUE NOT NULL REFERENCES "resumes"("id") ON DELETE CASCADE,
    "fullName" TEXT,
    "headline" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "location" TEXT,
    "website" TEXT,
    "linkedin" TEXT,
    "github" TEXT,
    "summary" TEXT
);

-- Work Experiences Table
CREATE TABLE "experiences" (
    "id" TEXT PRIMARY KEY,
    "resumeId" TEXT NOT NULL REFERENCES "resumes"("id") ON DELETE CASCADE,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "location" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "highlights" TEXT[] DEFAULT '{}',
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Educations Table
CREATE TABLE "educations" (
    "id" TEXT PRIMARY KEY,
    "resumeId" TEXT NOT NULL REFERENCES "resumes"("id") ON DELETE CASCADE,
    "institution" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "fieldOfStudy" TEXT,
    "location" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "gpa" TEXT,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Skills Table
CREATE TABLE "skills" (
    "id" TEXT PRIMARY KEY,
    "resumeId" TEXT NOT NULL REFERENCES "resumes"("id") ON DELETE CASCADE,
    "name" TEXT NOT NULL,
    "category" TEXT DEFAULT 'Technical',
    "level" "SkillLevel" NOT NULL DEFAULT 'ADVANCED',
    "orderIndex" INTEGER NOT NULL DEFAULT 0
);

-- Projects Table
CREATE TABLE "projects" (
    "id" TEXT PRIMARY KEY,
    "resumeId" TEXT NOT NULL REFERENCES "resumes"("id") ON DELETE CASCADE,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "techStack" TEXT[] DEFAULT '{}',
    "liveUrl" TEXT,
    "githubUrl" TEXT,
    "orderIndex" INTEGER NOT NULL DEFAULT 0
);

-- Certifications Table
CREATE TABLE "certifications" (
    "id" TEXT PRIMARY KEY,
    "resumeId" TEXT NOT NULL REFERENCES "resumes"("id") ON DELETE CASCADE,
    "name" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3),
    "credentialUrl" TEXT,
    "orderIndex" INTEGER NOT NULL DEFAULT 0
);

-- Cover Letters Table
CREATE TABLE "cover_letters" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "title" TEXT NOT NULL DEFAULT 'Untitled Cover Letter',
    "targetCompany" TEXT,
    "targetRole" TEXT,
    "jobDescription" TEXT,
    "bodyText" TEXT NOT NULL,
    "templateId" TEXT NOT NULL DEFAULT 'standard',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ATS Scans Table
CREATE TABLE "ats_scans" (
    "id" TEXT PRIMARY KEY,
    "resumeId" TEXT NOT NULL REFERENCES "resumes"("id") ON DELETE CASCADE,
    "userId" TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "targetJobTitle" TEXT NOT NULL,
    "targetJobDescription" TEXT NOT NULL,
    "overallScore" INTEGER NOT NULL,
    "matchedKeywords" TEXT[] DEFAULT '{}',
    "missingKeywords" TEXT[] DEFAULT '{}',
    "suggestions" TEXT[] DEFAULT '{}',
    "scannedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Review Requests Table
CREATE TABLE "review_requests" (
    "id" TEXT PRIMARY KEY,
    "resumeId" TEXT NOT NULL REFERENCES "resumes"("id") ON DELETE CASCADE,
    "requesterId" TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "reviewerId" TEXT REFERENCES "users"("id") ON DELETE CASCADE,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "scoreGiven" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Review Comments Table
CREATE TABLE "review_comments" (
    "id" TEXT PRIMARY KEY,
    "reviewRequestId" TEXT NOT NULL REFERENCES "review_requests"("id") ON DELETE CASCADE,
    "authorId" TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "section" TEXT,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
