export type Size = 'small' | 'medium' | 'large' | 'xs'

export const getInputHeight = (size: Size, inNumber?: boolean) => {
    switch (size) {
        case 'xs':
            return inNumber ? 28 : 'h-[30px]'
        case 'small':
            return inNumber ? 40 : 'h-[40px]'

        case 'medium':
            return inNumber ? 55 : 'h-[55px]'

        case 'large':
            return inNumber ? 70 : 'h-[70px]'

        default:
            return inNumber ? 40 : 'h-[40px]'
    }
}
