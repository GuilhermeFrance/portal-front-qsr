// import { defineStore } from "pinia";
// import type { ClientModel } from "../../components/models";
// import { computed, ref } from "vue";
// import axios from "axios";
// import router from "../../router";
// import { useAlertStore } from "./alertStore";
// import { Notify } from "quasar";

// export const useAuthStore = defineStore("auth",  () => {
//   const alertStore = useAlertStore();
//   const alerts = ref<string | null>(null);
//   const clientLogin = ref<ClientModel>({
//     email: "",
//     password: "",
//   });
//   const currentUser = ref<ClientModel | null>(null);
//   const token = ref<string | null>(localStorage.getItem("auth_token"));
//   const decodedPayload = ref<undefined | null>(null)
//   const isLoading = ref(false);
//   const isAuthenticated = computed(() => !!currentUser.value);
//   const fullName = computed(() => `${currentUser.value?.firstName} ${currentUser.value?.surname}`)
//   const API_URL_CLIENT = "http://localhost:3000/login";
//   const API_URL_CURRIENT = "http://localhost:3000/clients";

//   const loginError = ref<string | null>(null)


//   const userBadgeKey = computed(() => {
//     return decodedPayload.value?.badges ?? null;
//   })

//   function parseJwt(token: string | null) {
//     if (!token || typeof token !== "string") return null;
//     try {
//       const base64 = token.split(".")[1];
//       const jsonPayload = decodeURIComponent(
//         atob(base64!.replace(/-/g, "+").replace(/_/g, "/"))
//           .split("")
//           .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
//           .join("")
//       );
//       return JSON.parse(jsonPayload);
//     } catch (e) {
//       console.error("Erro ao decodificar JWT", e);
//       return null;
//     }
//   }

//   function hasBadge(badge: string){
//     const b = userBadgeKey.value;
//     if(!b) return false;
//     if(Array.isArray(b)) return b.includes(badge);
//     if(typeof b === 'string') return b === badge;
//     if(typeof b === 'object' && b.key) return b.key === badge;
//     return false
//   }

//   const isManager = computed(() =>  hasBadge('manager'))
//   const isAdmin = computed(() =>  hasBadge('admin'))



//   function isTokenExpired(tokenValue: string | null) {
//     const payload = parseJwt(tokenValue);
//     if (!payload || !payload.exp) return true;
//     const now = Math.floor(Date.now() / 1000);
//     return payload.exp < now;
//   }

//   async function handleSubmitLogin() {
//     if (!clientLogin.value.email || !clientLogin.value.password) {
//       console.log("Preencha todos os campos obrigatórios");
//       return (alerts.value = "Preencha todos os campos obrigatórios");
//     }
//     try {
//       isLoading.value = true;

//       const response = await axios.post(API_URL_CLIENT, clientLogin.value);
//       const authToken = response.data.access_token || response.data;

//       token.value = authToken;
//       localStorage.setItem("auth_token", authToken);
//       localStorage.setItem("user_email", clientLogin.value.email);
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;
//       await getCurrentUser();

//       decodedPayload.value = parseJwt(token.value)
//       console.log(decodedPayload.value)
//       console.log(response);
//       alertStore.showAlert(`Login feito com sucesso`, "success", 3000);
//       await router.push({ name: "inicio" });

//       console.log("Login feito com sucesso!");
//     } catch (error: unknown) {
//       console.error("Erro na criação do funcionário", error);
//       Notify.create({
//       message: 'Credenciais inválidas',
//       color: 'negative',
//       icon: 'warning',
//       timeout: 3000
//     })
//       const backEndMessage =
//         axios.isAxiosError(error) && error.response?.data?.message
//           ? error.response.data.message
//           : "Falha ao salvar. Verifique o sevidor.";

//       alerts.value = Array.isArray(backEndMessage)
//         ? backEndMessage.join(", ")
//         : backEndMessage;

//       console.log("Erro ao fazer login");
//     } finally {
//       isLoading.value = false;
//     }
//   }

//   async function getCurrentUser() {
//     if (!token.value) {
//       currentUser.value = null;
//       return;
//     }
//     const userEmail =
//       clientLogin.value.email || localStorage.getItem("user_email");

//     if (!userEmail) {
//       console.warn("Email não encontrado para buscar dados do usuário");
//       currentUser.value = null;
//     }

//     try {
//       if (token.value && !axios.defaults.headers.common["Authorization"]) {
//         axios.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${token.value}`;
//       }
//       const response = await axios.get(`${API_URL_CURRIENT}/${userEmail}`);
//       currentUser.value = response.data;
//     } catch (error: any) {
//       console.log("Erro ao buscar dados do usuário.", error);
//       const status = error?.response?.status;
//       if (status === 401 || status === 403) {
//         alertStore.showAlert("Token inválido/expirado. Executando logout.", 'success', 3000);
//         await logout();
//         return;
//       }
//     }
//   }

//   async function logout() {
//     try {
//       isLoading.value = true;
//       token.value = null;
//       currentUser.value = null;
//       clientLogin.value = {
//         email: "",
//         password: "",
//       };
//       localStorage.removeItem("auth_token");
//       delete axios.defaults.headers.common["Authorization"];
//       alerts.value = null;

//       console.log("Logout realizado com sucesso!");
//       await router.push({ name: "About" });
//     } catch (error) {
//       console.error("Erro ao fazer logout", error);
//     } finally {
//       isLoading.value = false;
//     }
//   }
//   async function initializeAuth() {
//     token.value = token.value || localStorage.getItem("auth_token");

//     if (!token.value) {
//       return;
//     }
//       decodedPayload.value = parseJwt(token.value)
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;
//     console.log(decodedPayload.value)
//     if (isTokenExpired(token.value)) {
//       console.info("Token expirado, faça login novamente");

//       alertStore.showAlert("Sessão expirada, faça login novamente.", 'warning', 3000)
//       await logout();
//       return;
//     }



//     try {
//       await getCurrentUser();
//       if (!currentUser.value) {
//         console.warn(
//           "Token presente mas não foi possível recuperar dados do usuário (mantendo sessão até expirar)."
//         );
//       }
//     } catch (error) {
//       console.error("Erro ao inicializar autenticação", error);
//     }
//   }

//   return {
//     clientLogin,
//     currentUser,
//     token,
//     isLoading,
//     isAuthenticated,
//     alert: alerts,
//     handleSubmitLogin,
//     logout,
//     initializeAuth,
//     getCurrentUser,
//     isManager,
//     isAdmin,
//     userBadgeKey,
//     hasBadge,
//     decodedPayload,
//     fullName,
//     loginError,
//   };
// });
