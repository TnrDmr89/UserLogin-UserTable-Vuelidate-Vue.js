<template>
    <div class="container">
        <div class="d-flex justify-content-center mt-2">
            <h3 style="color:rgb(97, 97, 196);">KULLANICI TABLOSU</h3>
        </div>
        <div class="d-flex justify-content-center mt-3">
            <table class="table table-striped table-success table-bordered border-success" style="width:80%;">
                <thead class="table-primary">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Password</th>
                        <th scope="col">Age</th>
                        <th scope="col">City</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Güncelle/Sil</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="(user, index) in getUser">
                        <th scope="row">{{ index + 1 }}</th>
                        <th scope="row">{{ user.name }}</th>
                        <th scope="row">{{ user.surname }}</th>
                        <th scope="row">{{ user.password }}</th>
                        <th scope="row">{{ user.age }}</th>
                        <th scope="row">{{ user.selectedCity }}</th>
                        <th scope="row">{{ user.gender }}</th>
                        <th scope="row">
                            <div class="d-flex justify-content-evenly">
                                <button type="button" class="btn btn-primary btn-sm button" @click="openModal(user,index)"
                                    data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    <i class="bi bi-arrow-clockwise"></i>
                                </button>
                                <button type="button" class="btn btn-danger btn-sm button" @click="remove(index)">
                                    <i class="bi bi-trash3"></i>
                                </button>
                            </div>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Kullanıcı Bilgisi Güncelle</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                        <div class="mt-2">
                            <label for="name" class="form-label"><b>Kullanıcı Adı:</b></label>
                            <input type="text" placeholder="Kullanıcı Adı" class="form-control" id="name" 
                            v-model="$v.user.name.$model" :class="!$v.user.name.$invalid ? 'is-valid' : 'is-invalid'">
                            <div v-if="$v.user.name.$invalid" class="invalid-feedback">Kullanıcı Adı Girin!!</div>
                        </div>
                        <div class="mt-3">
                            <label for="surname" class="form-label"><b>Kullanıcı Soyadı:</b></label>
                            <input type="text" placeholder="Kullanıcı Soyadı" class="form-control" id="surname" v-model="$v.user.surname.$model"
                            :class="!$v.user.surname.$invalid ? 'is-valid' : 'is-invalid'"
                            >
                            <div v-if="$v.user.surname.$invalid" class="invalid-feedback">Kullanıcı Soyadı Girin!!</div>
                        </div>
                        <div class="mt-3">
                            <label for="sifre" class="form-label"><b>Kullanıcı Şifresi:</b></label>
                            <input type="Password" placeholder="Kullanıcı Şifresi" class="form-control" id="sifre" v-model="$v.user.password.$model"
                            :class="!$v.user.password.$invalid ? 'is-valid' : 'is-invalid'">
                            <div v-if="$v.user.password.$invalid" class="invalid-feedback">Kullanıcı Şifresi Girin!!</div>
                        </div>
                        <div class="mt-3">
                            <label for="yas" class="form-label"><b>Kullanıcı Yaşı:</b></label>
                            <input type="Age" placeholder="Kullanıcı Yaşı" class="form-control" id="yas" v-model="$v.user.age.$model"
                            :class="!$v.user.age.$invalid ? 'is-valid' : 'is-invalid'">
                            <div v-if="$v.user.age.$invalid" class="invalid-feedback">Kullanıcı Yaşı {{ $v.user.age.$params.minValue.min }}'den küçük olmamalıdır</div>
                        </div>
                        <div class="mt-3">
                            <label for="sehir" class="form-label"><b>Şehirler:</b></label>
                            <select class="form-select" id="sehir" v-model="user.selectedCity">
                                <option v-for="city in cities" :value="city">{{ city }}</option>
                            </select>
                            <p style="margin-top: 30px;"><b>Yaşanılan Şehir:</b> {{ user.selectedCity }}</p>
                        </div>
                        <fieldset class="row mb-3">
                            <legend class="col-md-2 col-form-label"><b>Cinsiyet :</b> </legend>
                            <div class="col-md-10">
                                <div class="form-check">
                                    <label for="checkErkek" class="form-check-label">Erkek</label>
                                    <input type="radio" class="form-check-input" id="checkErkek" value="Erkek" v-model="user.gender">
                                </div>
                                <div class="form-check">
                                    <label for="checkKız" class="form-check-label">Kız</label>
                                    <input type="radio" class="form-check-input" id="checkKız" value="Kız" v-model="user.gender">
                                </div>
                            </div>
                        </fieldset>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn"
                        :class="$v.$invalid ? 'btn-dark' : 'btn-primary'" 
                        @click.prevent="update" data-bs-dismiss="modal" :disabled="$v.$invalid">Güncelle</button>
                    </div>
                    </form>
                    </div>
                </div>
            </div>    
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { alpha,required, numeric, minLength, maxLength,minValue } from 'vuelidate/lib/validators'
export default {
    data(){
        return {
            user:{
                selectedCity: null,
                gender:null,
                name:null,
                surname:null,
                password:null,
                age:null,
                index:null
                
            },   
            cities:['Ankara','Bolu','İzmir','Adana','Bursa','İstanbul'],
        }
    },
    computed: {
        ...mapGetters(['getUser', 'getClickUpdate'])
    },
    methods: {
        openModal(user,index) {
            this.user.name = user.name
            this.user.surname = user.surname
            this.user.age = user.age
            this.user.selectedCity = user.selectedCity
            this.user.gender = user.gender
            this.user.password = user.password
            this.user.index = index
        },
        remove(index) {
            this.$store.commit("deleteUser",index)
        },
        update(){
           this.$store.commit("updateUser", this.user)
           
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
                minValue:minValue(18)
            }
        }
    }
}
</script>

<style scoped>
.button:hover {
    cursor: pointer;
    width: 40px;
}
</style>
