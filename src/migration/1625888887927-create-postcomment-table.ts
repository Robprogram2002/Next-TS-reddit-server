import {MigrationInterface, QueryRunner} from "typeorm";

export class createPostcommentTable1625888887927 implements MigrationInterface {
    name = 'createPostcommentTable1625888887927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "createAt" TO "createdAt"`);
        await queryRunner.query(`ALTER TABLE "subs" RENAME COLUMN "createAt" TO "createdAt"`);
        await queryRunner.query(`ALTER TABLE "posts" RENAME COLUMN "createAt" TO "createdAt"`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "identifier" character varying NOT NULL, "body" character varying NOT NULL, "username" character varying NOT NULL, "postId" uuid NOT NULL, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8e7297165a3d53fa13b720bb11" ON "comments" ("identifier") `);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_5d9144e84650ce78f40737e284e" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_5d9144e84650ce78f40737e284e"`);
        await queryRunner.query(`DROP INDEX "IDX_8e7297165a3d53fa13b720bb11"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`ALTER TABLE "posts" RENAME COLUMN "createdAt" TO "createAt"`);
        await queryRunner.query(`ALTER TABLE "subs" RENAME COLUMN "createdAt" TO "createAt"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "createdAt" TO "createAt"`);
    }

}
