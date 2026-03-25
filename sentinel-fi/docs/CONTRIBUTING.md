# Contributing to Sentinel FI

Thank you for your interest in contributing to Sentinel FI! We welcome contributions from the community.

## Code of Conduct

Please be respectful and constructive in all interactions. We are committed to providing a welcoming environment for all contributors.

## How to Contribute

### 1. Fork and Clone

```bash
git clone https://github.com/your-username/sentinel-fi.git
cd sentinel-fi
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes

Follow the coding standards for each component:

- **Python SDK**: Follow PEP 8, use type hints, include docstrings
- **TypeScript SDK**: Follow ESLint rules, use TypeScript strictly
- **Core Engine**: Include unit tests, document algorithms
- **Documentation**: Use clear language, include examples

### 4. Test Your Changes

```bash
# Python SDK tests
cd sdk-python
pytest

# Web dashboard tests
cd ../web-dashboard
npm test
```

### 5. Submit a Pull Request

Push your changes and open a PR with:
- Clear description of changes
- Link to related issues
- Screenshots if UI changes
- Test results

## Development Guidelines

### Security Considerations

Since Sentinel FI handles financial transactions:

1. **Never commit credentials** - Use environment variables
2. **Audit all code** - Security review required for core changes
3. **Test thoroughly** - Financial bugs can be catastrophic
4. **Document assumptions** - Future maintainers need context

### Testing Requirements

- Unit tests for all new functionality
- Integration tests for API changes
- End-to-end tests for critical paths
- Performance benchmarks for core engine

### Documentation

- Update README if adding features
- Add inline comments for complex logic
- Include usage examples
- Update API documentation

## Areas We Need Help

### High Priority

1. **Guardrail Engine** - Rust implementation for performance
2. **Smart Contracts** - Solidity developers for custody contracts
3. **Compliance** - Regulatory expertise for different jurisdictions
4. **Integrations** - Connectors for brokers, banks, payment processors

### Medium Priority

1. **TypeScript SDK** - Complete the TS SDK implementation
2. **Mobile App** - React Native or Flutter dashboard
3. **Analytics** - Advanced risk metrics and visualization
4. **Documentation** - Tutorials, guides, API reference

### Nice to Have

1. **Additional SDKs** - Go, Java, Rust SDKs
2. **CLI Tools** - Enhanced command-line interface
3. **Educational Content** - Blog posts, video tutorials
4. **Community Management** - Discord moderation, events

## Questions?

Join our [Discord](https://discord.gg/sentinelfi) or open an issue on GitHub.

---

Thank you for helping make AI finance safer for everyone! 🛡️
