import { describe, expect, it, jest } from '@jest/globals';

import { RequestIdMiddleware } from './request-id.middleware';

type mockRequestGet = (key: string) => string | undefined;

describe('Test RequestIdMiddleware', () => {
  it("set request id from request header['REQ-ID']", () => {
    const request: any = {
      get: jest.fn<mockRequestGet>().mockImplementation((key: string) => {
        return {
          'REQ-ID': 'foobar',
        }[key];
      }),
    };
    const response: any = {
      locals: {},
      setHeader: jest.fn(),
    };
    new RequestIdMiddleware().use(request, response, jest.fn() as any);
    expect(response.locals.reqId).toEqual('foobar');
  });

  it("set request id from request header['X-Amz-Cf-Id']", () => {
    const request: any = {
      get: jest.fn<mockRequestGet>().mockImplementation(key => {
        return {
          'X-Amz-Cf-Id': 'foobar',
        }[key];
      }),
    };
    const response: any = {
      locals: {},
      setHeader: jest.fn(),
    };
    new RequestIdMiddleware().use(request, response, jest.fn() as any);
    expect(response.locals.reqId).toEqual('foobar');
  });

  it('generate request id to if requestId not set', () => {
    const request: any = {
      get: jest.fn<mockRequestGet>().mockImplementation(key => {
        return {}[key];
      }),
    };
    const response: any = {
      locals: {},
      setHeader: jest.fn(),
    };
    new RequestIdMiddleware().use(request, response, jest.fn() as any);
    expect(response.locals.reqId).toBeDefined();
  });
});
