import {
  ApplicationCommandOption,
  Client,
  CommandInteraction,
  Guild,
  GuildMember,
  TextChannel,
  User,
} from "discord.js";

import CommandType from "./src/util/CommandType";
import CooldownTypes from "./src/util/CooldownTypes";
import Cooldowns from "./src/util/Cooldowns";

export default class WOK {
  private _client!: Client;
  private _testServers!: string[];
  private _botOwners!: string[];
  private _cooldowns: Cooldowns | undefined;
  private _disabledDefaultCommands!: string[];
  private _validations!: Validations;
  private _commandHandler: CommandHandler | undefined;
  private _eventHandler!: EventHandler;
  private _isConnectedToDB = false;

  constructor(options: Options);

  public get client(): Client;
  public get testServers(): string[];
  public get botOwners(): string[];
  public get cooldowns(): Cooldowns;
  public get disabledDefaultCommands(): string[];
  public get validations(): Validations;
  public get commandHandler(): CommandHandler;
  public get eventHandler(): EventHandler;
  public get isConnectedToDB(): boolean;
}

export interface Options {
  client: Client;
  mongoUri?: string;
  commandsDir?: string;
  testServers?: string[];
  botOwners?: string[];
  cooldownConfig?: CooldownConfig;
  disabledDefaultCommands?: string[];
  events?: Events;
  validations?: Validations;
}

export interface CooldownConfig {
  errorMessage: string;
  botOwnersBypass: boolean;
  dbRequired: number;
}

export interface Events {
  dir: string;
  [key: string]: any;
}

export interface Validations {
  runtime?: string;
  syntax?: string;
}

export class Cooldowns {
  constructor(instance: WOK, oldownConfig: CooldownConfig) {}
}

export interface CooldownUsage {
  errorMessage?: string;
  type: CooldownTypes;
  duration: string;
}

export interface InternalCooldownConfig {
  cooldownType: CooldownTypes;
  userId: string;
  actionId: string;
  guildId?: string;
  duration?: string;
  errorMessage?: string;
}

export interface CommandUsage {
  client: Client;
  instance: WOK;
  message?: Message | null;
  interaction?: CommandInteraction | null;
  args: string[];
  text: string;
  guild?: Guild | null;
  member?: GuildMember;
  user: User;
  channel?: TextChannel;
  cancelCooldown?: function;
  updateCooldown?: function;
}

export interface CommandObject {
  callback: function;
  type: CommandType;
  init?: function;
  description?: string;
  aliases?: string[];
  testOnly?: boolean;
  guildOnly?: boolean;
  ownerOnly?: boolean;
  permissions?: bigint[];
  deferReply?: "ephemeral" | boolean;
  cooldowns?: CooldownUsage;
  minArgs?: number;
  maxArgs?: number;
  correctSyntax?: string;
  expectedArgs?: string;
  options?: ApplicationCommandOption[];
  autocomplete?: function;
  reply?: boolean;
  delete?: boolean;
}

export type FileData = {
  filePath: string;
  fileContents: any;
};

export class Command {
  constructor(instance: WOK, commandName: string, commandObject: CommandObject);

  public get instance(): WOK;
  public get commandName(): string;
  public get commandObject(): CommandObject;
}

export { CommandObject, Command, CommandType, CooldownTypes };
