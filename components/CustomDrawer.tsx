import { authStore } from '@/store/auth.store';
import { colors } from '@/theme/theme';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { useRouter } from 'expo-router';
import { Image, Linking, Pressable, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from './Button';




export default function CustomDrawer(props: any) {
  const { bottom, top } = useSafeAreaInsets()
  const logout = authStore(state => state.logout)
  const user = authStore(state => state.user)

  return (
    <View style={{ flex: 1, }}>

      <DrawerContentScrollView {...props}
        contentContainerStyle={{ flex: 1 }}
        scrollEnabled={false}

      >
        <View style={{ padding: 10 }}>
          <Image source={require('@/assets/images/cutlery.png')} alt='logo' style={{ objectFit: 'cover', width: 100, height: 100, alignSelf: 'left' }} />
          <Text style={{ textAlign: 'left', fontWeight: 700 }}>{user?.name}</Text>
        </View>


        <View style={{
          flex: 1,



        }}>
          <DrawerItemList {...props} />

          <Button text='Logout' onPress={logout} styles={{ margin: 'auto', marginTop: 10 }} />

        </View>


      </DrawerContentScrollView>


    </View>
  );
}
