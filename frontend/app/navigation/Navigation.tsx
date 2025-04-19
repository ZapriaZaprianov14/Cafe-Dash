import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Cafeteria } from '../types/items';
import Login from '../screens/auth/LoginScreen/Login';
import Register from '../screens/auth/RegisterScreen/Register';
import Home from '../screens/home/Home';
import Profile from "../screens/profile/Profile";
import Orders from "../screens/orders/Orders";
import CafesList from '../screens/cafes/CafeListScreen/CafesList';
import CafeDetail from '../screens/cafes/CafeDetailScreen/CafeDetail';
import CafeMenu from '../screens/cafes/CafeMenuScreen/CafeMenu';
import CafeReviews from '../screens/cafes/CafeReviewsScreen/CafeReviews';
import LeaveReview from '../screens/leaveReview/LeaveReview';
import Cart from '../screens/cart/Cart'
import CreateCafeteria from '../screens/cafes/CafeCreateScreen/CreateCafe';
import CreateUser from '../screens/users/create/CreateUser';
import Test from '../screens/test/Test'
import ContactUs from "../screens/contact/ContactUs";
import CreateProduct from "@/app/screens/products/CreateProduct/CreateProduct";
import UsersList from '../screens/users/list/UsersList';
import UserReviewsList from '../screens/users/reviews/UserReviewsList';
import UserEdit from '../screens/users/edit/UserEdit';
import ForgotPassword from '../screens/forgottenPassword/ForgotPassword';
import ResetPassword from '../screens/forgottenPassword/ResetPassword';

export type RootStackParamList = {
    login: undefined;
    register: undefined;
    home: undefined;
    profile: {userId: number};
    orders: undefined;
    cafeslist: undefined;
    cafedetail: { cafe: Cafeteria };
    cafemenu: { cafe: Cafeteria };
    cafereviews: { cafe: Cafeteria };
    leavereview: { cafe: Cafeteria };
    createcafeteria: undefined;
    createproduct: {cafe: Cafeteria};
    cart: undefined;
    test: undefined;
    createuser: undefined;
    contact: undefined;
    userslist: undefined;
    userreviews: {userId: number};
    useredit: {userId: number};
    forgotpassword: undefined;
    resetpassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="orders" component={Orders} />
            <Stack.Screen name="cafeslist" component={CafesList} />
            <Stack.Screen name="cafedetail" component={CafeDetail} />
            <Stack.Screen name="cafemenu" component={CafeMenu} />
            <Stack.Screen name="cafereviews" component={CafeReviews} />
            <Stack.Screen name="leavereview" component={LeaveReview} />
            <Stack.Screen name="createcafeteria" component={CreateCafeteria} />
            <Stack.Screen name="createproduct" component={CreateProduct} />
            <Stack.Screen name="cart" component={Cart} />
            <Stack.Screen name="test" component={Test} />
            <Stack.Screen name="createuser" component={CreateUser} />
            <Stack.Screen name="contact" component={ContactUs} />
            <Stack.Screen name="userslist" component={UsersList} />
            <Stack.Screen name="userreviews" component={UserReviewsList} />
            <Stack.Screen name="useredit" component={UserEdit} />
            <Stack.Screen name="forgotpassword" component={ForgotPassword} />
            <Stack.Screen name="resetpassword" component={ResetPassword} />
        </Stack.Navigator>
    );
};

export default Navigation;