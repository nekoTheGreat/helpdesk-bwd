<script setup lang="ts">
import AuthService from '~~/services/AuthService';

const service = new AuthService();
service.logout();
navigateTo("/");
</script>