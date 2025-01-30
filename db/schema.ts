import { integer, pgTable, varchar, boolean, date, text,uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const Device = pgTable('devices', {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar('name'),
    statusId: uuid('status_id').references(() => Status.id),
    currentUserId: varchar('current_user_id'),
    locationId: uuid('location_id').references(() => Location.id),
    purchaseCost: varchar('purchase_cost'),
    purchaseDate: date('purchase_date'),
    supplierId: uuid('supplier_id').references(() => Supplier.id),
    purchaseOrderId: varchar('purchase_order_id'),
    serialNumber: varchar('serial_number'),
    modelId: uuid('model_id').references(() => Model.id),
    image: varchar('image'),
    byod: boolean('byod'),
    notes: text('notes'),
    available: boolean('available'),
    manufacturerId: uuid('manufacturer_id').references(() => Manufacturer.id),
    categoryId: uuid('category_id').references(() => Category.id),
});
export const devicesRelations = relations(Device, ({ one }) => ({
    Status: one(Status, {
        fields: [Device.statusId],
        references: [Status.id],
    }),
    Location: one(Location, {
        fields: [Device.locationId],
        references: [Location.id],
    }),
    Supplier: one(Supplier, {
        fields: [Device.supplierId],
        references: [Supplier.id],
    }),
    Model: one(Model, {
        fields: [Device.modelId],
        references: [Model.id],
    }),
    Manufacturer: one(Manufacturer, {
        fields: [Device.manufacturerId],
        references: [Manufacturer.id],
    }),
   }),
);

export const Location = pgTable('locations', {
    id:  uuid().defaultRandom().primaryKey(),
    name: varchar('name'),
    
});
export const locationsRelations = relations(Location, ({ many }) => ({
    items: many(Item),
    devices: many(Device),
}));

export const Item = pgTable('items', {
    id:  uuid().defaultRandom().primaryKey(),
    name: varchar('name'),
    statusId: uuid('status_id').references(() => Status.id),
    currentUserId: varchar('current_user_id'),
    locationId: uuid('location_id').references(() => Location.id),
    purchaseCost: varchar('purchase_cost'),
    purchaseDate: date('purchase_date'),
    supplierId: uuid('supplier_id').references(() => Supplier.id),
    purchaseOrderId: varchar('purchase_order_id'),
    serialNumber: varchar('serial_number'),
    modelId: uuid('model_id').references(() => Model.id),
    image: varchar('image'),
    byod: boolean('byod'),
    notes: text('notes'),
    available: boolean('available'),
    manufacturerId: uuid('manufacturer_id').references(() => Manufacturer.id),
    categoryId: uuid('category_id').references(() => Category.id),
    userId: varchar('user_id'),
});
export const itemsRelations = relations(Item, ({ one }) => ({
    Status: one(Status, {
        fields: [Item.statusId],
        references: [Status.id],
    }),
    Location: one(Location, {
        fields: [Item.locationId],
        references: [Location.id],
    }),
    Supplier: one(Supplier, {
        fields: [Item.supplierId],
        references: [Supplier.id],
    }),
    Model: one(Model, {
        fields: [Item.modelId],
        references: [Model.id],
    }),
    Manufacturer: one(Manufacturer, {
        fields: [Item.manufacturerId],
        references: [Manufacturer.id],
    }),
    category: one(Category, {
        fields: [Item.categoryId],
        references: [Category.id],
    }),
   })
);

export const Supplier = pgTable('suppliers', {
    id:  uuid().defaultRandom().primaryKey(),
    website: varchar('website'),
    phoneNumber: varchar('phone_number'),
    contactPerson: varchar('contact_person'),
    postAdress: varchar('post_adress'),
    emailAdress: varchar('email_adress'),
});
export const suppliersRelations = relations(Supplier, ({ many }) => ({
    items: many(Item),
    devices: many(Device),
}));
export const Manufacturer = pgTable('manufacturers', {
    id:  uuid().defaultRandom().primaryKey(),
    name: varchar('name'),
    image: varchar('image'),
    siteUrl: varchar('site_url'),
    supportUrl: varchar('support_url'),
    supportPhone: varchar('support_phone'),
    supportEmail: varchar('support_email'),
});
export const manufacturersRelations = relations(Manufacturer, ({ many }) => ({
    models: many(Model),
    devices: many(Device),
    items: many(Item),
}));

export const Model = pgTable('models', {
    id:  uuid().defaultRandom().primaryKey(),
    name: varchar('name'),
    image: varchar('image'),
    modelNumber: varchar('model_number'),
    manufacturerId: uuid('manufacturer_id').references(() => Manufacturer.id),
    categoryId: uuid('category_id').references(() => Category.id),
});


export const modelsRelations = relations(Model, ({ one, many}) => ({
    Manufacturer: one(Manufacturer, {
        fields: [Model.manufacturerId],
        references: [Manufacturer.id],
    }),
    category: one(Category, {
        fields: [Model.categoryId],
        references: [Category.id],
    }),
    items: many(Item),
    devices: many(Device),
   }),
);

export const Category = pgTable('categories', {
    id:  uuid().defaultRandom().primaryKey(),
    name: varchar('name'),
    type: varchar('type'),
});
export const categoriesRelations = relations(Category, ({ many }) => ({
    models: many(Model),
    items: many(Item),
    devices: many(Device),
}));


// export const Log = pgTable('logs', {
//     id: varchar('id').primaryKey().default('cuid()'),
//     userId: varchar('user_id'),
//     action: varchar('action'),
//     item: varchar('item'),
//     itemType: varchar('item_type'), // device/item
// });

export const Status = pgTable('statuses', {
    id:  uuid().defaultRandom().primaryKey(),
    name: varchar('name'),
    color: varchar('color'),
    default: boolean('default').default(false),
});
export const statusesRelations = relations(Status, ({ many }) => ({
    items: many(Item),
    devices: many(Device),
}));