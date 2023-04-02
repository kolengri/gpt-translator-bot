import {restrictUsers} from '../restrictUsers';

describe('restrictUsers', () => {
  let ctx: BotOnMessageContext;
  let next: jest.Mock;

  beforeEach(() => {
    // Initialize mock context and next function for each test
    ctx = {
      message: {
        from: {
          id: 123,
        },
      },
      reply: jest.fn(),
    } as any as BotOnMessageContext;
    next = jest.fn();
  });

  it('should call next if user is allowed', async () => {
    // Set up mock user ID that is allowed
    ctx.message.from.id = 549067334;

    // Call the restrictUsers function with the mock context and next function
    await restrictUsers(ctx, next);

    // Assert that the next function was called
    expect(next).toHaveBeenCalled();
  });

  it('should reply with an error message if user is not allowed', async () => {
    // Set up mock user ID that is not allowed
    ctx.message.from.id = 456;

    // Call the restrictUsers function with the mock context and next function
    await restrictUsers(ctx, next);

    // Assert that the reply method was called with the error message
    expect(ctx.reply).toHaveBeenCalledWith(
      'Sorry, you do not have access to this feature.'
    );

    // Assert that the next function was not called
    expect(next).not.toHaveBeenCalled();
  });
});
