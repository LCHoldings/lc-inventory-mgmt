import { integer, pgTable, varchar, boolean, date, text, } from "drizzle-orm/pg-core";

export const Device = pgTable('devices', {
    id: varchar('id').primaryKey().default('cuid()'),
    name: varchar('name'),
    statusId: varchar('status_id').references(() => Status.id),
    currentUserId: varchar('current_user_id'),
    locationId: varchar('location_id').references(() => Location.id),
    purchaseCost: varchar('purchase_cost'),
    purchaseDate: date('purchase_date'),
    supplierId: varchar('supplier_id').references(() => Supplier.id),
    purchaseOrderId: varchar('purchase_order_id'),
    serialNumber: varchar('serial_number'),
    modelId: varchar('model_id').references(() => Model.id),
    image: varchar('image'),
    byod: boolean('byod'),
    notes: text('notes'),
    available: boolean('available'),
    manufacturerId: varchar('manufacturer_id').references(() => Manufacturer.id),
    categoryId: varchar('category_id').references(() => Category.id),
});

export const Location = pgTable('locations', {
    id: varchar('id').primaryKey().default('cuid()'),
    name: varchar('name'),
});

export const Item = pgTable('items', {
    id: varchar('id').primaryKey().default('cuid()'),
    name: varchar('name'),
    statusId: varchar('status_id').references(() => Status.id),
    currentUserId: varchar('current_user_id'),
    locationId: varchar('location_id').references(() => Location.id),
    purchaseCost: varchar('purchase_cost'),
    purchaseDate: date('purchase_date'),
    supplierId: varchar('supplier_id').references(() => Supplier.id),
    purchaseOrderId: varchar('purchase_order_id'),
    serialNumber: varchar('serial_number'),
    modelId: varchar('model_id').references(() => Model.id),
    image: varchar('image'),
    byod: boolean('byod'),
    notes: text('notes'),
    available: boolean('available'),
    manufacturerId: varchar('manufacturer_id').references(() => Manufacturer.id),
    categoryId: varchar('category_id').references(() => Category.id),
    userId: varchar('user_id'),
});

export const Supplier = pgTable('suppliers', {
    id: varchar('id').primaryKey().default('cuid()'),
    website: varchar('website'),
    phoneNumber: varchar('phone_number'),
    contactPerson: varchar('contact_person'),
    postAdress: varchar('post_adress'),
    emailAdress: varchar('email_adress'),
});

export const Manufacturer = pgTable('manufacturers', {
    id: varchar('id').primaryKey().default('cuid()'),
    name: varchar('name'),
    image: varchar('image'),
    siteUrl: varchar('site_url'),
    supportUrl: varchar('support_url'),
    supportPhone: varchar('support_phone'),
    supportEmail: varchar('support_email'),
});

export const Model = pgTable('models', {
    id: varchar('id').primaryKey().default('cuid()'),
    name: varchar('name'),
    image: varchar('image'),
    modelNumber: varchar('model_number'),
    manufacturerId: varchar('manufacturer_id').references(() => Manufacturer.id),
    categoryId: varchar('category_id').references(() => Category.id),
});

export const Category = pgTable('categories', {
    id: varchar('id').primaryKey().default('cuid()'),
    name: varchar('name'),
    type: varchar('type'),
});

export const Log = pgTable('logs', {
    id: varchar('id').primaryKey().default('cuid()'),
    userId: varchar('user_id'),
    action: varchar('action'),
    item: varchar('item'),
    itemType: varchar('item_type'), // device/item
});

export const Status = pgTable('statuses', {
    id: varchar('id').primaryKey().default('cuid()'),
    name: varchar('name'),
    color: varchar('color'),
    default: boolean('default').default(false),
});
