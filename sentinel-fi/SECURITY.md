# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**IMPORTANT: Do not open public issues for security vulnerabilities.**

We take the security of Sentinel FI seriously. If you believe you've found a security vulnerability, please follow these steps:

### How to Report

1. **Email**: Send details to security@sentinelfi.org
2. **Encrypt**: Use our PGP key (available on request)
3. **Include**: 
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Initial Response**: Within 48 hours
- **Status Update**: Within 5 business days
- **Resolution Timeline**: Depends on severity
  - Critical: 24-72 hours
  - High: 1 week
  - Medium: 2 weeks
  - Low: 1 month

### Bug Bounty Program

We offer rewards for responsible disclosure of security vulnerabilities:

| Severity | Reward Range |
|----------|-------------|
| Critical | $50,000 - $1,000,000 |
| High     | $10,000 - $50,000 |
| Medium   | $2,000 - $10,000 |
| Low      | $500 - $2,000 |

**Critical vulnerabilities** that could lead to loss of funds receive the highest rewards.

### Scope

**In Scope:**
- Core guardrail engine
- Smart contracts
- SDK libraries
- API endpoints
- Authentication/Authorization
- Transaction validation

**Out of Scope:**
- Denial of Service attacks
- Social engineering
- Third-party integrations (unless caused by our code)
- Vulnerabilities requiring physical access

### Responsible Disclosure Guidelines

- Give us reasonable time to fix before public disclosure
- Make a good faith effort to avoid privacy violations
- Do not access or modify other users' data
- Do not degrade service performance
- Cooperate with our investigation

### Security Best Practices for Contributors

1. **Never commit secrets** - Use environment variables
2. **Validate all inputs** - Assume all input is malicious
3. **Use prepared statements** - Prevent SQL injection
4. **Implement rate limiting** - Prevent abuse
5. **Log security events** - Enable audit trails
6. **Keep dependencies updated** - Monitor for vulnerabilities
7. **Follow principle of least privilege** - Minimal permissions

### Past Security Advisories

| Date       | Severity | Description                          | Fixed In |
|------------|----------|--------------------------------------|----------|
| 2024-01-15 | Medium   | Input validation in policy parser    | 1.0.1    |

For questions about this policy, contact security@sentinelfi.org

---

*This security policy is inspired by industry best practices and adapts as our project evolves.*
