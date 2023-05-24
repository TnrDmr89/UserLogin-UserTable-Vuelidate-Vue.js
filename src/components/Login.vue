<template>
    <div class="container">
        <div class="row mt-3">
            <div class="col-md-6 offset-md-3">
                <div class="card shadow">
                    <div class="card-body">
                        <div class="card-header d-flex justify-content-center"
                            style="background-color: lightblue; color:blue">KULLANICI GİRİŞ</div>
                        <form>
                            <div class="mt-2">
                                <label for="name" class="form-label"><b>Kullanıcı Adı:</b></label>
                                <input type="text" class="form-control" id="name"
                                    v-model="$v.user.name.$model" :class="classCheck($v.user.name)">
                                <div v-if="$v.user.name.$invalid" class="invalid-feedback">Kullanıcı Adı Girin!!</div> 
                            </div>
                            <div class="mt-3">
                                <label for="surname" class="form-label"><b>Kullanıcı Soyadı:</b></label>
                                <input type="text" class="form-control" id="surname"
                                    v-model="$v.user.surname.$model" :disabled="$v.user.name.$invalid" :class="!$v.user.name.$invalid ? classCheck($v.user.surname) : ''">
                                <div v-if="$v.user.surname.$invalid" class="invalid-feedback">Kullanıcı Soyadı Girin!!</div>
                            </div>
                            <div class="mt-3">
                                <label for="sifre" class="form-label"><b>Kullanıcı Şifresi:</b></label>
                                <input type="Password" class="form-control" id="sifre"
                                    v-model="$v.user.password.$model" :disabled="$v.user.surname.$invalid" :class="!$v.user.surname.$invalid ? classCheck($v.user.password) : ''">
                                <div v-if="$v.user.password.$invalid" class="invalid-feedback">Kullanıcı Şifresi Girin!!</div>
                            </div>
                            <div class="mt-3">
                                <label for="yas" class="form-label"><b>Kullanıcı Yaşı:</b></label>
                                <input type="Age" class="form-control" id="yas"
                                    v-model="$v.user.age.$model" :disabled="$v.user.password.$invalid" :class="!$v.user.password.$invalid ? classCheck($v.user.age) : ''">
                            </div>
                            <div class="mt-3">
                                <label for="sehir" class="form-label"><b>Yaşanılan Şehir:</b></label>
                                <select class="form-select mb-3" id="sehir" v-model="user.selectedCity">
                                    <option v-for="city in cities" :value="city">{{ city }}</option>
                                </select>
                            </div>
                            <fieldset class="row mb-3">
                                <legend class="col-md-2 col-form-label"><b>Cinsiyet :</b> </legend>
                                <div class="col-md-10">
                                    <div class="form-check">
                                        <label for="checkErkek" class="form-check-label">Erkek</label>
                                        <input type="radio" class="form-check-input" id="checkErkek" value="Erkek"
                                            v-model="user.gender">
                                    </div>
                                    <div class="form-check">
                                        <label for="checkKız" class="form-check-label">Kız</label>
                                        <input type="radio" class="form-check-input" id="checkKız" value="Kız"
                                            v-model="user.gender">
                                    </div>
                                </div>
                            </fieldset>
                            <div class="d-flex justify-content-center">
                                <button class="btn" :class="$v.$invalid ? 'btn-dark' : 'btn-primary'" @click.prevent="save"
                                    :disabled="$v.$invalid">Kaydet</button>
                            </div>
                            <p>{{ $v.user.age }}</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { alpha,required, numeric, minLength, maxLength,minValue } from 'vuelidate/lib/validators'
export default {
    data() {
        return {
            user: {
                selectedCity: null,
                gender: null,
                name: null,
                surname: null,
                password: null,
                age: null
            },
            cities: ['Ankara', 'Bolu', 'İzmir', 'Adana', 'Bursa', 'İstanbul'],
        }
    },
    methods: {
        save() {
            let user = {
                selectedCity: this.user.selectedCity,
                gender: this.user.gender,
                name: this.user.name,
                surname: this.user.surname,
                password: this.user.password,
                age: this.user.age,
            }
            this.$store.commit("saveUser", user)
            for (let key in this.user) {
                this.user[key] = null
            }
        },
        classCheck(user) {
            if (user.$invalid)
                return 'is-invalid'
            else {
                return 'is-valid'
            }
        }
    },
    validations: {
        user: {
            name: {
                required,
                alpha
            },
            surname: {
                required,
                alpha
            },
            password: {
                required,
                numeric,
                minLength: minLength(8),
                maxLength: maxLength(12)
            },
            age: {
                required,
                minLength:minValue(18)
            }
        }
    }
}
</script>

<style></style>