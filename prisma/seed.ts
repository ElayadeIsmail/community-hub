import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
	console.log('🌱 Seeding...');
	console.time(`🌱 Database has been seeded`);

	const data = Array.from({ length: 100 }).map((n, idx) => {
		return {
			title: faker.lorem.sentence().slice(0, 20).trim(),
			content: faker.lorem.paragraphs(),
			authorId:
				idx % 3 === 0
					? 'clpybo1j60000dyl9m2gte1vd'
					: 'clq29o25k0002ag3tzhce1a5p',
			communityId:
				idx % 4 === 0
					? 'clpybpihq0005dyl9n2a1f9s9'
					: 'clpyhxvff0000m9cgto4hdy9g',
		};
	});

	await Promise.all(
		data.map((_d) =>
			prisma.post.create({
				data: _d,
			})
		)
	);

	console.timeEnd(`🌱 Database has been seeded`);
}

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
