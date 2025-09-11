import vine from '@vinejs/vine'

export const deviceValidator = vine.compile(
    vine.object({
        name: vine.string(),
        ip_address: vine.string().ipAddress(),
        location: vine.string().minLength(3).maxLength(255),
    })
)