import { ChatGateway } from "../chat/chat.gateway";
import { Server, Socket } from "socket.io";

describe("ChatGateway", () => {
  let chatGateway: ChatGateway;
  let mockServer: Partial<Server>;
  let mockSocket: Partial<Socket>;

  beforeEach(() => {
    chatGateway = new ChatGateway();
    mockServer = {
      emit: jest.fn(),
    };
    mockSocket = {
      id: "mockSocketId",
      emit: jest.fn(),
      handshake: {
        query: {
          clientId: "mockClientId",
          letterName: "A",
        },
      } as any,
      connected: true,
    };
    chatGateway.server = mockServer as Server;
    chatGateway.clients.set("mockClientId", {
      clientId: "mockClientId",
      letterName: "a",
      connected: true,
    });
  });

  it("should emit userInfo and allMessages when a client connects", () => {
    chatGateway.handleConnection(mockSocket as Socket);
    const expectedClientInfo = {
      clientId: "mockClientId",
      letterName: "a",
      connected: true,
    };
    expect(mockSocket.emit).toHaveBeenCalledWith(
      "userInfo",
      expectedClientInfo
    );
    expect(mockSocket.emit).toHaveBeenCalledWith(
      "allMessages",
      chatGateway.messages
    );
    expect(mockServer.emit).toHaveBeenCalledWith("allUsers", expect.any(Array));
  });

  it("should remove client from clients and emit allUsers when a client disconnects", () => {
    chatGateway.handleDisconnect(mockSocket as Socket);

    expect(chatGateway.clients.size).toBe(0);
    expect(chatGateway.clients.has("mockClientId")).toBe(false);
    expect(mockServer.emit).toHaveBeenCalledWith("allUsers", expect.any(Array));
  });

  it("It is adding the new client if necessary and issuing it to all instances", () => {
    const message = "test message";
    chatGateway.handleMessage(mockSocket as Socket, message);
    expect(chatGateway.clients.size).toBe(1);
    expect(chatGateway.clients.has("mockClientId")).toBe(true);
    expect(mockServer.emit).toHaveBeenCalledWith("allUsers", expect.any(Array));
  });

  it('should update letterName for an existing client', () => {
    const fullName = 'Test Name';
    chatGateway.handleUpdateLetterName(mockSocket as Socket, fullName);

    const clientInfo = chatGateway.clients.get('mockClientId');
    expect(clientInfo).toBeDefined();
    expect(clientInfo.letterName).toBe('T'); 
    expect(mockSocket.emit).toHaveBeenCalledWith('userInfo', clientInfo);
    expect(mockServer.emit).toHaveBeenCalledWith('allUsers', expect.any(Array));
  });
});
