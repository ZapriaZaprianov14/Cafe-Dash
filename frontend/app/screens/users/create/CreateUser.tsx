import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import HasRoles from '@/app/utilComponents/HasRoles';
import customAPI from '@/app/services/apiClient';
import { useAuth } from '@/app/context/AuthContext';
import { CreateUserDTO } from '@/app/types/items';
import CommonHeader from '@/app/components/headers/commonHeader/CommonHeader';
import styles from './CreateUser.style';

const CreateUser = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>('');
  
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const availableRoles: string[] = ['admin', 'owner', 'employee'];

  const toggleRoleSelection = (role: string): void => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    setFormErrors({});
    setApiError('');

    const errors: { [key: string]: string } = {};

    if (!username.trim()) {
      errors.username = "Username is required.";
    }
    else if (username.length < 6) {
      errors.username = "Username must be at least 6 characters.";
    }
    if (!email.trim()) {
      errors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = "Enter a valid email address.";
      }
    }
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    if (user) {
      let isAdmin = false;
      for (let i = 0; i < user.roles.length; i++) {
        console.log(user.roles[i].authority);
        if (user.roles[i].authority === 'admin') {
          isAdmin = true;
          break;
        }
      }
      if (isAdmin && selectedRoles.length === 0) {
        errors.roles = "Please select at least one role.";
      }
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    let roleNames: string[] = [];
    if (user && user.roles.some(r => r.authority === 'admin')) {
      roleNames = selectedRoles;
    } else if (user && user.roles.some(r => r.authority === 'owner')) {
      roleNames = ['employee'];
    }

    const newUser: CreateUserDTO = {
      username,
      email,
      passwordHash: password,
      roleNames,
    };

    setLoading(true);
    try {
      const response = await customAPI.post('/api/users', newUser);
      if (response.status !== 201) {
        throw new Error(response.data?.message || 'Error creating user');
      }
      setUsername('');
      setEmail('');
      setPassword('');
      setSelectedRoles([]);
      alert('User created successfully');
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <CommonHeader title="Create a new User"/>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.registerContainer}>
          <Text style={styles.title}>
            <Text style={styles.highlight}>Create New User</Text>
          </Text>
          {apiError ? <Text style={styles.errorText}>{apiError}</Text> : null}

          <TextInput
            label="Username"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setFormErrors((prev) => ({ ...prev, username: '' }));
            }}
            style={styles.input}
            mode="outlined"
          />
          {formErrors.username && (
            <Text style={styles.errorText}>{formErrors.username}</Text>
          )}

          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setFormErrors((prev) => ({ ...prev, email: '' }));
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            mode="outlined"
          />
          {formErrors.email && (
            <Text style={styles.errorText}>{formErrors.email}</Text>
          )}

          <TextInput
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setFormErrors((prev) => ({ ...prev, password: '' }));
            }}
            secureTextEntry
            style={styles.input}
            mode="outlined"
          />
          {formErrors.password && (
            <Text style={styles.errorText}>{formErrors.password}</Text>
          )}

          <HasRoles roles={['admin']}>
            <View style={styles.selectRolesContainer}>
              <Text style={styles.selectRolesLabel}>Select Roles:</Text>
              <View style={styles.roleButtonContainer}>
                {availableRoles.map(role => {
                  const isSelected = selectedRoles.includes(role);
                  return (
                    <Button
                      key={role}
                      mode={isSelected ? 'contained' : 'outlined'}
                      onPress={() => toggleRoleSelection(role)}
                      style={[
                        styles.roleButton,
                        isSelected && styles.selectedRoleButton
                      ]}
                      labelStyle={[
                        styles.roleButtonText,
                        isSelected && styles.selectedRoleButtonText
                      ]}
                    >
                      {role}
                    </Button>
                  );
                })}
              </View>
              {formErrors.roles && (
                <Text style={styles.errorText}>{formErrors.roles}</Text>
              )}
            </View>
          </HasRoles>

          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.registerButton}
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Creating User...' : 'Create User'}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateUser;
