import { MigrationInterface, QueryRunner } from "typeorm"

export class User1710479007271 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    // this part you will add your self
            await queryRunner.query(
            ` 
                --Table Definition
                CREATE TABLE "users"  (
                    "user_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                    "username" VARCHAR(32) UNIQUE NOT NULL,
                    "email" VARCHAR(64) UNIQUE NOT NULL,
                    "password" VARCHAR(128) NOT NULL,
                    "role"  character varying NOT NULL DEFAULT 'user',
                    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                    "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
                )
            `
            ),
            undefined;
    }
        
    public async down(queryRunner: QueryRunner): Promise<void> {
        // and this part
        await queryRunner.query(`DROP TABLE "users"`, undefined);
    }

}
