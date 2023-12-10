import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createProductDto: Prisma.ProductCreateInput) {
    return this.databaseService.product.create({ data: createProductDto });
  }

  async findAll() {
    return this.databaseService.product.findMany({
      include: {
        description: {
          select: {
            content: true,
          },
        },
        tags: true,
        reviews: {
          select: {
            id: true,
            content: true,
            rating: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.databaseService.product.findUnique({
      where: { id },
      include: {
        description: {
          select: {
            content: true,
          },
        },
        tags: true,
        reviews: {
          select: {
            id: true,
            content: true,
            rating: true,
          },
        },
      },
    });
  }

  async update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    return this.databaseService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.product.delete({ where: { id } });
  }
}
