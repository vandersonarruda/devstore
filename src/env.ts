import { z } from 'zod'

// definimos o schema de validação dos nossos dados
const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
})

// aqui iremos passar para o método safeParse o process.env
const parsedEnv = envSchema.safeParse(process.env)

// se não estiver seguindo o schema, iremos lançar um erro
// parsedEnv.error.flatten().fieldErrors -> transforma o erro de forma mais legível
if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables',
    parsedEnv.error.flatten().fieldErrors,
  )

  throw new Error('Invalid environment variables.')
}

export const env = parsedEnv.data
