import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  domain: string;

  @Column()
  adminEmail: string;

  @Column(type => Subscription)
  subscription: Subscription;

  @Column(type => Settings)
  settings: Settings;

  @Column(type => Features)
  features: Features;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  password: string;

  @Column()
  db_name: string;

  @Column()
  db_password: string;

  @Column()
  db_user: string;

  constructor() {
    this.id = '';
    this.name = '';
    this.domain = '';
    this.adminEmail = '';
    this.subscription = new Subscription();
    this.settings = new Settings();
    this.features = new Features();
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.password = '';
    this.db_name = '';
    this.db_password = '';
    this.db_user = '';
  }
}

export class Subscription {
  @Column()
  plan: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column(type => PaymentDetails)
  paymentDetails: PaymentDetails;

  constructor() {
    this.plan = '';
    this.startDate = new Date();
    this.endDate = new Date();
    this.paymentDetails = new PaymentDetails();
  }
}

export class PaymentDetails {
  @Column()
  currency: string;

  @Column()
  paymentMode: string;

  @Column()
  totalAmount: number;

  @Column()
  isRecurring: boolean;

  constructor() {
    this.currency = '';
    this.paymentMode = '';
    this.totalAmount = 0;
    this.isRecurring = false;
  }
}

export class Settings {
  @Column()
  locale: string;

  @Column()
  timezone: string;

  @Column()
  dateFormat: string;

  @Column()
  currencyFormat: string;

  constructor() {
    this.locale = '';
    this.timezone = '';
    this.dateFormat = '';
    this.currencyFormat = '';
  }
}

export class Features {
  @Column()
  customAttributes: boolean;

  @Column()
  workflowAutomation: boolean;

  @Column()
  analytics: boolean;

  constructor() {
    this.customAttributes = false;
    this.workflowAutomation = false;
    this.analytics = false;
  }
}
