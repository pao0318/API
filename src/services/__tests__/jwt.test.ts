import Token from '../../common/constants/token';
import { JwtService } from '../jwt/jwt.service';
import faker from 'faker';
import { verify, sign } from 'jsonwebtoken';
import config from '../../config';
import { UnauthorizedException } from '../../common/exceptions/unauthorized.exception';

describe('JWT service', () => {
    const jwtService = new JwtService();

    describe('Generate token method', () => {
        describe('Access token', () => {
            const payload = { id: faker.random.uuid(), email: faker.internet.email() };
            const token = jwtService.generateToken(Token.ACCESS, payload);

            it('Should be defined string', () => {
                expect(token).toBeDefined();
            });

            it('Should be signed using correct secret', () => {
                verify(token, config.AUTH.ACCESS_TOKEN_SECRET, (error) => {
                    expect(error).toBeNull();
                });
            });

            it('Should include correct payload', () => {
                verify(token, config.AUTH.ACCESS_TOKEN_SECRET, (_, decoded) => {
                    expect(decoded).toMatchObject(payload);
                });
            });
        })
    });

    describe('Verify token and get payload method', () => {
        describe('Access token', () => {
            describe('When token is invalid', () => {
                const token = faker.random.alphaNumeric(10);
    
                it('Should throw UNAUTHORIZED_EXCEPTION', () => {
                    expect(jwtService.verifyTokenAndGetPayload.bind(jwtService, Token.ACCESS, token)).toThrowError(UnauthorizedException);
                });
            });

            describe('When token is expired', () => {
                const token = sign({ id: faker.random.uuid(), email: faker.internet.email() }, config.AUTH.ACCESS_TOKEN_SECRET, { expiresIn: '0.01s'});

                it('Should throw UNAUTHORIZED_EXCEPTION', () => {
                    expect(jwtService.verifyTokenAndGetPayload.bind(jwtService, Token.ACCESS, token)).toThrowError(UnauthorizedException);
                });
            });

            describe('When token is valid', () => {
                const payload = { id: faker.random.uuid(), email: faker.internet.email() };
                const token = jwtService.generateToken(Token.ACCESS, payload);

                it('Should return correct payload', () => {
                    const actualPayload = jwtService.verifyTokenAndGetPayload(Token.ACCESS, token);
                    expect(actualPayload).toMatchObject(payload);
                });
            });
        });
    });
});