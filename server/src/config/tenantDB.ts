import { MongoClient } from "mongodb";
import { DataSource } from "typeorm";
import tenantEntities from "../entities/crm";

export default async function getTenantDatabaseConnection(domain: string): Promise<DataSource> {
    // Connect to the main database
    const mainDbClient = new MongoClient('mongodb://localhost:27017/skinnable_crm');
    await mainDbClient.connect();
    const regex = /https?:\/\/([a-zA-Z0-9.-]+)\//;
    const match = domain.match(regex);
    const matchedDomain = match ? match[1] : "";
    // Fetch tenant details
    console.log(`Fetching tenant details ${matchedDomain}`,);
    const tenantCollection = mainDbClient.db('skinnable_crm').collection('tenants');
    const tenant = await tenantCollection.findOne({ domain: matchedDomain });
    if (!tenant) {
        throw new Error('Tenant not found');
    }

    const { db_name, db_user, db_password } = tenant;

    // Create a new DataSource instance for the tenant database
    const tenantDataSource = new DataSource({
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        database: db_name,
        username: db_user,
        password: db_password,
        entities: tenantEntities, // Adjust the path to your entities
        synchronize: true, // Disable in production
    });

    await tenantDataSource.initialize();
    const entities = tenantDataSource.entityMetadatas;

    console.log("Registered Entities:");
    entities.forEach((entity) => {
        console.log(entity.name); // Entity class name
    });
    console.log('Tenant database connection established');

    return tenantDataSource;
}