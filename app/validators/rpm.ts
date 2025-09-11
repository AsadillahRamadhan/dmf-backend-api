import vine from '@vinejs/vine'

export const rpmValidator = vine.compile(
    vine.object({
        device_id: vine.string().uuid(),
        user_id: vine.string().uuid(),
        rpm: vine.number().min(0),
        is_active: vine.boolean(),
        is_clockwise: vine.boolean(),
    })
)