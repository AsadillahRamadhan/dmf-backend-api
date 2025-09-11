import vine from '@vinejs/vine'

export const temperatureValidator = vine.compile(
    vine.object({
        device_id: vine.string().uuid(),
        temperature: vine.number().min(-273.15),
    })
)