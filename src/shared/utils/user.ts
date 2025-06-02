import AsyncStorage from "@react-native-async-storage/async-storage"


export type User = {
    avatar: string
    name: string
}

export const setAvatarImg = async (avatarUri: string) => {
    const user = await getUser()
    if (!user) return
    user.avatar = avatarUri
    await saveUser(user)
}

export const getUser = async (): Promise<User | null> => {
    const user = await AsyncStorage.getItem('user')
    if (!user) return null
    const jsonUser = JSON.parse(user)
    return jsonUser
}

export const saveUser = async (user: User) => {
    const jsonUser = JSON.stringify(user)
    await AsyncStorage.setItem('user', jsonUser)
}