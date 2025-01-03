import { colors } from '@/theme/theme';
import Ionicons from '@expo/vector-icons/Ionicons';



export const EyeOpenIcon = () => (<Ionicons name="eye" size={24} color="black" />)
export const EyeCloseIcon = () => (<Ionicons name="eye-off-sharp" size={24} color="black" />)
export const BackIcon = () => (<Ionicons name="arrow-back-circle" size={24} color="black" />)
export const BagIcon = () => (<Ionicons name="bag-outline" size={24} color="black" />)
export const UsdIcon = () => (<Ionicons name="logo-usd" size={24} color="black" />)
export const AddCircle = (props: any) => (<Ionicons name='add-circle-outline' size={28} color={colors.background} {...props} />)
export const RemoveCircle = (props: any) => (<Ionicons name='remove-outline' size={28} color={colors.background} {...props} />
)