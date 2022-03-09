const dataModels = {
  user: {
    id: 0,
    last_login: null,
    is_superuser: false,
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    is_staff: false,
    is_active: true,
    has_confirmed: false,
    has_twofactor: false,
    is_premium: false,
    created_at: "",
    updated_at: "",
    groups: [],
    user_permissions: [],
  },

  userRegister: {
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    is_staff: false,
    is_superuser: false,
    password: "",
    password2: "",
  },
};

export default function getDataModel(dataType) {
  return dataModels[dataType];
}
