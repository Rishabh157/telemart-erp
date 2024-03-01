import { UserModuleNameTypes } from 'src/utils/mediaJson/userAccess'
import store from 'src/redux/store'

export type PermissionType = keyof typeof UserModuleNameTypes

export const isAuthorized: (
    permission: keyof typeof UserModuleNameTypes
) => boolean | undefined = (permission) => {
    const { permissions, userData } = store.getState().auth
    if (userData?.userRole === 'ADMIN') {
        return true
    }
    return permission
        ? permissions?.includes(UserModuleNameTypes[permission])
        : true
}
