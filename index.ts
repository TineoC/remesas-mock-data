import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const AMOUNT_OF_REGISTRIES = 2000000
const FIRST_CEDULA = 10000000000

const CreatedBy = 'system'
const UpdatedBy = 'system'

const beneficiarios = []
const remesas = []
const contacto_beneficiarios = []

for (let i = 0; i < AMOUNT_OF_REGISTRIES + 1; i++) {
  console.log('Inserting registry number #: ', i)

  const BENEFICIARIO_ID = 11066 + i

  const payload = {
    Id: BENEFICIARIO_ID,
    NombreCompleto: faker.internet.displayName(),
    Cedula: String(FIRST_CEDULA + i),
    CreatedBy,
    UpdatedBy,
  }

  const payload2 = {
    Codigo: faker.internet.mac(),
    FechaGeneracion: new Date(),
    Hash: faker.internet.mac(),
    Moneda: 'DOP',
    Monto: faker.number.float({
      min: 1000,
      max: 35000,
      precision: 2,
    }),
    Salt: faker.internet.mac(),
    CreatedBy,
    UpdatedBy,
    ContactoNotificacionId: BENEFICIARIO_ID,
    BeneficiarioId: BENEFICIARIO_ID,
    EstatusRemesaId: 2,
    ArchivoId: faker.number.int({
      min: 1,
      max: 13,
    }),
  }

  const payload3 = {
    Id: BENEFICIARIO_ID,
    BeneficiarioId: BENEFICIARIO_ID,
    Contacto: faker.phone.number(),
    TipoContactoId: 1,
    UpdatedBy,
    CreatedBy,
  }

  beneficiarios.push(payload)
  remesas.push(payload2)
  contacto_beneficiarios.push(payload3)
}

await prisma.$transaction([
  prisma.beneficiario.createMany({
    data: beneficiarios,
  }),
  prisma.contactoBeneficiario.createMany({
    data: contacto_beneficiarios,
  }),
  prisma.remesa.createMany({
    data: remesas,
  }),
])
