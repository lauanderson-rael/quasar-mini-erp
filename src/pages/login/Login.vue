<template>
  <q-page
    class="window-height window-width row justify-center items-center"
  >
    <div class="column q-pa-lg">
      <div class="row" :class="margin-mobile">
        <q-card  class="shadow-24 glass-card" style="width: 400px">
          <q-card-section class="bg-primary">
            <h4 class="text-h5 text-white q-my-md text-center">
              Mini ERP - Login
            </h4>
          </q-card-section>

          <q-card-section>
            <q-form class="q-px-sm" @submit="entrar">
              <q-input
                ref="login"
                square
                clearable
                v-model="state.login"
                type="text"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 3) || 'Campo obrigatório',
                ]"
                label="E-mail"
              >
                <template v-slot:prepend>
                  <q-icon name="verified_user" />
                </template>
              </q-input>

              <q-input
                ref="password"
                square
                clearable
                v-model="state.senha"
                :type="state.passwordFieldType"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 5) || 'Campo obrigatório',
                ]"
                label="Senha"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="state.visibilityIcon"
                    @click="switchVisibility"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
              <q-card-actions>
                <q-btn
                  unelevated
                  size="lg"
                  color="primary"
                  type="submit"
                  class="full-width text-white"
                  label="Entrar"
                />
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useQuasar, debounce, Cookies } from "quasar";
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();

    const state = reactive({
      login: ref(""),
      senha: ref(""),
      passwordFieldType: ref("password"),
      visibilityIcon: ref("visibility"),
    });

    function entrar() {
      $q.loading.show();

      api
        .post("/login", {
          email: state.login,
          password: state.senha,
          device_name: "web_admin",
        })
        .then((response) => {
          if (response.status === 200) {
            const tokenAPI = response.data.token;

            let dataExpiracao = new Date();
            dataExpiracao.setTime(
              dataExpiracao.getTime() + 7 * 24 * 60 * 60 * 1000
            );
            let expires = dataExpiracao.toUTCString();
            Cookies.set("token_adm_minierp", tokenAPI, { expires: expires });

            $q.loading.hide();
            debounce(router.push({ path: "/" }), 100);
          } else {
            throw new Error("Erro ao realizar login");
          }
        })
        .catch((error) => {
          console.log(error);

          $q.notify({
            type: "negative",
            message: "Não foi possível fazer o Login. Login/Senha inválidos",
          });

          $q.loading.hide();
        })
        .finally(() => {
          $q.loading.hide();
        });
    }

    function switchVisibility() {
      state.visibility = !state.visibility;
      state.passwordFieldType = state.visibility ? "text" : "password";
      state.visibilityIcon = state.visibility ? "visibility_off" : "visibility";
    }

    onMounted(() => {
      if ($q.loading.isActive) $q.loading.hide();
    });

    return {
      state,
      entrar,
      switchVisibility,
    };
  },
};
</script>

<style scoped lang="scss">


@media(max-width: 769px){
  .margin-mobile{
    margin: 0 10px;
  }
}

.glass-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(2px);
}
</style>
