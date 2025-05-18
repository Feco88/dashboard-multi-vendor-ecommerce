import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../api/api';
import { jwtDecode } from "jwt-decode";

export const admin_login = createAsyncThunk(
'auth/admin_login',
async(info,{rejectWithValue, fulfillWithValue}) => {
    //console.log(info)
    try {
        const {data} = await api.post('/admin_login',info,{withCredentials: true})
        localStorage.setItem('accessToken',data.token)
        // console.log(data)
        return fulfillWithValue(data)
    } catch (error) {
        // console.log(error.response.data)
        return rejectWithValue(error.response.data)
    }
}
)

export const seller_login = createAsyncThunk(
'auth/seller_login',
async(info,{rejectWithValue, fulfillWithValue}) => {
    //console.log(info)
    try {
        const {data} = await api.post('/seller-login',info,{withCredentials: true})
        // console.log(data)
        localStorage.setItem('accessToken',data.token)
        return fulfillWithValue(data)
    } catch (error) {
        // console.log(error.response.data)
        return rejectWithValue(error.response.data)
    }
}
)

export const get_user_info = createAsyncThunk(
'auth/get_user_info',
async(_,{rejectWithValue, fulfillWithValue}) => {
    try {
        const {data} = await api.get('/get-user',{withCredentials: true})
        // console.log(data)
        return fulfillWithValue(data)
    } catch (error) {
        // console.log(error.response.data)
        return rejectWithValue(error.response.data)
    }
}
)

// Profilkép feltöltése metódus kezdete
export const profile_image_upload = createAsyncThunk(
'auth/profile_image_upload',
async(image,{rejectWithValue, fulfillWithValue}) => {
    try {
        const {data} = await api.post('/profile-image-upload', image,
        {withCredentials: true})
        // console.log(data)
        return fulfillWithValue(data)
    } catch (error) {
        // console.log(error.response.data)
        return rejectWithValue(error.response.data)
    }
}
)
// Profilkép feltöltése metódus vége
// Eladó regisztrációs metódus eleje
export const seller_register = createAsyncThunk(
'auth/seller_register',
async(info,{rejectWithValue, fulfillWithValue}) => {
    try {
        console.log(info)
        const {data} = await api.post('/seller-register',info,{withCredentials: true})
        localStorage.setItem('accessToken',data.token)
        //console.log(data)
        return fulfillWithValue(data)
    } catch (error) {
        // console.log(error.response.data)
        return rejectWithValue(error.response.data)
    }
}
)
// Eladó regisztrációs metódus vége
// Eladói boltinformációk metódus eleje

export const profile_info_add = createAsyncThunk(
'auth/profile_info_add',
async(info,{rejectWithValue, fulfillWithValue}) => { 
    try { 
        const {data} = await api.post('/profile-info-add',info,{withCredentials: true}) 
        return fulfillWithValue(data)
    } catch (error) {
        // console.log(error.response.data)
        return rejectWithValue(error.response.data)
    }
}
)
// Eladói boltinformációk metódus vége

const returnRole = (token) => {
if (token) {
    const decodeToken = jwtDecode(token)
    const expireTime = new Date(decodeToken.exp * 1000)
    if (new Date() > expireTime) {
        localStorage.removeItem('accessToken')
        return ''
    } else {
        return decodeToken.role
    }
} else {
    return ''
}
}
// metódus vége

// admin és eladó kijelentkeztetése metódus
export const logout = createAsyncThunk(
'auth/logout',
async({navigate,role},{rejectWithValue, fulfillWithValue}) => {
    try {
        const {data} = await api.get('/logout',{withCredentials: true})
        localStorage.removeItem('accessToken')
//ellenőrizzük, hogy Admin vagy Eladó a szerepkör
        if (role === 'admin') {
            navigate('/admin/login')
        } else {
            navigate('/login')
        }
        return fulfillWithValue(data)
    } catch (error) {
        // console.log(error.response.data)
        return rejectWithValue(error.response.data)
    }
}
)
// admin és eladó kijelentkeztetése metódus vége
//Eladó - jelszó megváltoztatása metódus
export const change_password = createAsyncThunk(
'auth/change_password',
 //info = bemeneti mezők értéke
async(info,{rejectWithValue, fulfillWithValue}) => {
    try {
     const {data} = await api.post('/change-password', info,
     {withCredentials: true})
      return fulfillWithValue(data.message)
   } catch (error) {
       return rejectWithValue(error.response.data.message)
  }
}
)
//Eladó - jelszó megváltoztatása metódus vége
export const authSlice = createSlice({

name: 'auth',
initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    //---hibás!!! userInfo: {},
    userInfo: '',
    role: returnRole(localStorage.getItem('accessToken')),
    token: localStorage.getItem('accessToken'),
},
reducers: {
    messageClear : (state,_) => {
        state.errorMessage = ""
    },
},
extraReducers: (builder) => {
    // Extra reducers konfiguráció
    builder
    .addCase(admin_login.pending, (state, { payload }) => {
        state.loader = true;
    })
    .addCase(admin_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error
    })
    .addCase(admin_login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message
        state.token = payload.token
        state.role = returnRole(payload.token)
    })

    .addCase(seller_login.pending, (state, { payload }) => {
        state.loader = true;
    })
    .addCase(seller_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error
    })
    .addCase(seller_login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message
        state.token = payload.token
        state.role = returnRole(payload.token)
    })

    .addCase(seller_register.pending, (state, { payload }) => {
        state.loader = true;
    })
    .addCase(seller_register.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error
    })
    .addCase(seller_register.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message
        state.token = payload.token
        state.role = returnRole(payload.token)
    })
    .addCase(get_user_info.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo
    })
    .addCase(profile_image_upload.pending, (state, { payload }) => {
        state.loader = true;
    })
    .addCase(profile_image_upload.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo
        state.successMessage = payload.message
    })
    .addCase(profile_info_add.pending, (state, { payload }) => {
        state.loader = true; 
    })
    .addCase(profile_info_add.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo
        state.successMessage = payload.message
    })
    //Eladói jelszó megváltoztatása
    .addCase(change_password.pending, (state) => {
        state.loader = true;
        state.errorMessage = null;
    })
    .addCase(change_password.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload;
    })
    .addCase(change_password.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload;
    })
}
})

export const { messageClear } = authSlice.actions; // A redux toolkit "actions"-ből exportálva.
export default authSlice.reducer;                   // A default export a reducer.

//Ez a jó eladói szempontból, viszont admin-login nem működik!!!!
/*
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const admin_login = createAsyncThunk(
    'auth/admin_login',
    async(info,{rejectWithValue, fulfillWithValue}) => {
         console.log(info)
        try {
            const {data} = await api.post('/admin-login',info,{withCredentials: true})
            localStorage.setItem('accessToken',data.token)
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)


export const seller_login = createAsyncThunk(
    'auth/seller_login',
    async(info,{rejectWithValue, fulfillWithValue}) => {
         console.log(info)
        try {
            const {data} = await api.post('/seller-login',info,{withCredentials: true})
            console.log(data)
            localStorage.setItem('accessToken',data.token) 
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_user_info = createAsyncThunk(
    'auth/get_user_info',
    async(_ ,{rejectWithValue, fulfillWithValue}) => {
          
        try {
            const {data} = await api.get('/get-user',{withCredentials: true})
            // console.log(data)            
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)


export const profile_image_upload = createAsyncThunk(
    'auth/profile_image_upload',
    async(image ,{rejectWithValue, fulfillWithValue}) => {
          
        try {
            const {data} = await api.post('/profile-image-upload',image,{withCredentials: true})
            // console.log(data)            
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
// end method 

export const seller_register = createAsyncThunk(
    'auth/seller_register',
    async(info,{rejectWithValue, fulfillWithValue}) => { 
        try {
            console.log(info)
            const {data} = await api.post('/seller-register',info,{withCredentials: true})
            localStorage.setItem('accessToken',data.token)
            //  console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

// end method 

export const profile_info_add = createAsyncThunk(
    'auth/profile_info_add',
    async(info,{rejectWithValue, fulfillWithValue}) => { 
        try { 
            const {data} = await api.post('/profile-info-add',info,{withCredentials: true}) 
            return fulfillWithValue(data)
        } catch (error) {
            // console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)
// end method 



    const returnRole = (token) => {
        if (token) {
           const decodeToken = jwtDecode(token)
           const expireTime = new Date(decodeToken.exp * 1000)
           if (new Date() > expireTime) {
             localStorage.removeItem('accessToken')
             return ''
           } else {
                return decodeToken.role
           }
            
        } else {
            return ''
        }
    }

    // end Method 

    export const logout = createAsyncThunk(
        'auth/logout',
        async({navigate,role},{rejectWithValue, fulfillWithValue}) => {
             
            try {
                const {data} = await api.get('/logout', {withCredentials: true}) 
                localStorage.removeItem('accessToken',data.token) 
                if (role === 'admin') {
                    navigate('/admin/login')
                } else {
                    navigate('/login')
                }
                return fulfillWithValue(data)
            } catch (error) {
                // console.log(error.response.data)
                return rejectWithValue(error.response.data)
            }
        }
    )

        // end Method 

 
export const authReducer = createSlice({
    name: 'auth',
    initialState:{
        successMessage :  '',
        errorMessage : '',
        loader: false,
        userInfo : '',
        role: returnRole(localStorage.getItem('accessToken')),
        token: localStorage.getItem('accessToken')
    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
        }

    },
    extraReducers: (builder) => {
        builder
        .addCase(admin_login.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(admin_login.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(admin_login.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message
            state.token = payload.token
            state.role = returnRole(payload.token)
        })

        .addCase(seller_login.pending, (state, { payload }) => {
            state.loader = true;
        }) 
        .addCase(seller_login.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(seller_login.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message
            state.token = payload.token
            state.role = returnRole(payload.token)
        })

        .addCase(seller_register.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(seller_register.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
        .addCase(seller_register.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message
            state.token = payload.token
            state.role = returnRole(payload.token)
        })

        .addCase(get_user_info.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.userInfo = payload.userInfo
        })

        .addCase(profile_image_upload.pending, (state, { payload }) => {
            state.loader = true; 
        })
        .addCase(profile_image_upload.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.userInfo = payload.userInfo
            state.successMessage = payload.message
        })

        .addCase(profile_info_add.pending, (state, { payload }) => {
            state.loader = true; 
        })
        .addCase(profile_info_add.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.userInfo = payload.userInfo
            state.successMessage = payload.message
        })

    }

})
export const {messageClear} = authReducer.actions
export default authReducer.reducer
*/