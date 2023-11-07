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

  // const payload = {
  //   NombreCompleto: faker.internet.displayName(),
  //   Cedula: String(FIRST_CEDULA + i),
  //   CreatedBy,
  //   UpdatedBy,
  // }

  const payload2 = {
    Codigo: faker.internet.mac(),
    FechaGeneracion: new Date(),
    Hash: faker.internet.mac(),
    Moneda: 'DOP',
    Monto: faker.number.float({
      min: 1000,
      max: 35000,
    }),
    Salt: faker.internet.mac(),
    CreatedBy,
    UpdatedBy,
    ContactoNotificacionId: faker.number.int({
      min: 1,
      max: AMOUNT_OF_REGISTRIES,
    }),
    BeneficiarioId: faker.number.int({
      min: 1,
      max: AMOUNT_OF_REGISTRIES,
    }),
    EstatusRemesaId: 2,
    ArchivoId: faker.number.int({
      min: 1,
      max: 13,
    }),
  }

  const payload3 = {
    BeneficiarioId: faker.number.int({
      min: 2,
      max: 11065 + AMOUNT_OF_REGISTRIES,
    }),
    Contacto: faker.phone.number(),
    TipoContactoId: 1,
    UpdatedBy,
    CreatedBy,
  }

  // beneficiarios.push(payload)
  contacto_beneficiarios.push(payload3)
  remesas.push(payload2)
}

// await prisma.beneficiario.createMany({
//   data: beneficiarios,
// })

await prisma.contactoBeneficiario.createMany({
  data: contacto_beneficiarios,
})

await prisma.remesa.createMany({
  data: remesas,
})

console.log('Termino')
