const userMock = {
    completeData: {
      _id: "617a81413934bb0f7af30e62",
      username: "johndoe",
      firstname: "John",
      lastname: "Doe",
      email: "johndoe@test.com",
      phone: "07023456789",
      password: "johndoe123",
      confirmPassword: "johndoe123",
      role: "normal",
    },
    incompleteRequiredData: {
      firstname: "John",
      email: "johndoe@test.com",
      password: "johndoe123",
      confirmPassword: "johndoe123"
    },
    diffPasswords: {
      firstname: "John",
      lastname: "Doe",
      email: "johndoe@test.com",
      password: "johndoe123",
      confirmPassword: "johndoe023"
    },

    // Email Logins
    loginData: {
      // email: 'johndoe@test.com',
      email: 'johndoe',
      password: 'johndoe123'
    },
    incompleteLoginData: {
      email: 'johndoe@test.com'
    },
    incorrectLoginPassword: {
      email: 'johndoe@test.com',
      password: 'incorrectPassword'
    },
    incorrectLoginEmail: {
        email: 'johndoe222@test.com',
        password: 'johndoe123'
    },

    // Username Logins
    usernameLoginData: {
      // username to use email field from fe.
      email: 'johndoe', 
      password: 'johndoe123'
    },
    incompleteUsernameLoginData: {
      email: 'johndoe'
    },
    incorrectUsernameLoginPassword: {
      email: 'johndoe',
      password: 'incorrectPassword'
    },
    incorrectLoginUsername: {
      email: 'thewrongjohndoe',
      password: 'johndoe123'
    }
}

export default userMock;