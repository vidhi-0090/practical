<!-- js/components/Register.vue -->
<template>
    <main>
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div class="form_wrapper">
                <div class="form_container">
                    <div class="title_container">
                        <h2>Registration Form</h2>
                    </div>
                    <div class="row clearfix">
                        <div class="">
                            <!-- <p
                                style="color: red"
                                v-for="error in errors"
                                :key="error"
                            >
                                {{ error }}
                                <span v-for="err in error" :key="err">
                                    {{ err }}
                                </span>
                            </p> -->
                            <form @submit.prevent="register">
                                <div class="row clearfix">
                                    <div class="col_half">
                                        <div class="input_field">
                                            <span
                                                ><font-awesome-icon
                                                    icon="user"
                                                />
                                            </span>
                                            <input
                                                type="text"
                                                name="name"
                                                v-model="form.name"
                                                placeholder="First Name"
                                            />
                                            <p style="color: red" id="name">
                                                {{ errors.name }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="col_half">
                                        <div class="input_field">
                                            <span
                                                ><font-awesome-icon icon="user"
                                            /></span>
                                            <input
                                                type="text"
                                                name="last_name"
                                                v-model="form.last_name"
                                                placeholder="Last Name"
                                            />
                                            <p style="color: red" id="name">
                                                {{ errors.last_name }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="input_field">
                                    <span
                                        ><font-awesome-icon icon="envelope"
                                    /></span>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        v-model="form.email"
                                    />
                                    <p style="color: red" id="email">
                                        {{ errors.email }}
                                    </p>
                                </div>
                                <div class="input_field">
                                    <span
                                        ><font-awesome-icon icon="lock"
                                    /></span>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        v-model="form.password"
                                    />
                                    <p style="color: red" id="password">
                                        {{ errors.password }}
                                    </p>
                                </div>
                                <div class="input_field">
                                    <span
                                        ><font-awesome-icon icon="lock"
                                    /></span>
                                    <input
                                        type="password"
                                        name="password_confirmation"
                                        placeholder="Re-type Password"
                                        v-model="form.password_confirmation"
                                    />
                                    <p
                                        style="color: red"
                                        id="password_confirmation"
                                    >
                                        {{ errors.password_confirmation }}
                                    </p>
                                </div>

                                <div class="input_field radio_option">
                                    <input
                                        type="radio"
                                        name="gender"
                                        id="rd1"
                                        value="Male"
                                        v-model="form.gender"
                                    />
                                    <label for="rd1">Male</label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        id="rd2"
                                        value="Female"
                                        v-model="form.gender"
                                    />
                                    <label for="rd2">Female</label>
                                    <p style="color: red" id="gender">
                                        {{ errors.gender }}
                                    </p>
                                </div>

                                <div class="input_field multi_select_option">

                                    <VueMultiselect
                                        v-model="form.interest"
                                        :options="options"
                                        multiple
                                    ></VueMultiselect>

                                    <p style="color: red" id="interest">
                                        {{ errors.interest }}
                                    </p>
                                </div>

                                <div class="input_field">
                                    <span
                                        ><font-awesome-icon icon="camera"
                                    /></span>
                                    <input
                                        type="file"
                                        name="image"
                                        placeholder="Profile"
                                        ref="imageInput"
                                        @change="handleImageUpload"
                                    />
                                    <p style="color: red" id="image">
                                        {{ errors.image }}
                                    </p>
                                </div>

                                <input
                                    class="button"
                                    type="submit"
                                    value="Register"
                                />
                            </form>
                            <p class="credit">
                                Allready member?
                                <router-link to="/login"
                                    ><b> Login </b></router-link
                                >
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import axios from "axios";
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import _ from "lodash";

import VueMultiselect from 'vue-multiselect'
const options = ref(["Singing", "Dancing", "Playing", "Reading"]);

const router = useRouter();

const form = ref({
    name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    gender: "",
    interest: [],
});

const errors = reactive({
    name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    gender: "",
    interest: "",
    image: "",
});

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    form.value.image = file;
};

const register = async () => {
    console.log("interest:" + form.value.interest);
    const formData = new FormData();
    formData.append("name", form.value.name + " " + form.value.last_name);
    formData.append("email", form.value.email);
    formData.append("password", form.value.password);
    formData.append("password_confirmation", form.value.password_confirmation);
    formData.append("gender", form.value.gender);

    form.value.interest.forEach((interest, index) => {
        formData.append(`interest[${index}]`, interest);
    });

    if (form.value.image) {
        formData.append("image", form.value.image);
    }

    try {
        const response_register = await axios.post("api/register", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response_register.data.status === true) {
            Swal.fire({
                icon: "success",
                title: "Registration Successful",
                text: "You will be redirected to the login page.",
                showConfirmButton: true,
            }).then(() => {
                router.push("login");
            });
        } else {
            const responseErrors = response_register.data.message;
            for (const field in responseErrors) {
                if (field in errors) {
                    errors[field] = responseErrors[field][0];
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style lang="scss" scoped>
@import "../../css/app.css";

.select2-container--default .select2-selection--multiple {
    border-radius: 0px !important;
    height: 37px !important;
}
.select2-container--default
    .select2-results__option--highlighted[aria-selected] {
    background-color: #1f2937 !important;
    color: white !important;
}
</style>
