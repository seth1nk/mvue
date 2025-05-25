<template>
  <div class="app-container">
    <h1 class="page-title">Просмотр вакансии</h1>
    <div v-if="loading" class="loading-message">Загрузка данных...</div>
    <div v-else-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-else-if="vacancy" class="vacancy-details">
      <div class="product-image-container">
        <img v-if="vacancy.photo" :src="`${backendUrl}${vacancy.photo}`" alt="Vacancy Photo" class="product-image" />
        <span v-else>Нет изображения</span>
      </div>
      <div class="vacancy-info">
        <p><strong>Название вакансии:</strong> {{ vacancy.job_title || 'N/A' }}</p>
        <p><strong>Компания:</strong> {{ vacancy.company_name || 'N/A' }}</p>
        <p><strong>Зарплата:</strong> {{ vacancy.salary ? `${vacancy.salary} ₽` : 'N/A' }}</p>
        <p><strong>График работы:</strong> {{ vacancy.work_schedule || 'N/A' }}</p>
        <p><strong>Местоположение:</strong> {{ vacancy.location || 'N/A' }}</p>
        <p><strong>Требуемый опыт:</strong> {{ vacancy.required_experience ?? 'N/A' }}</p>
        <p><strong>Дата публикации:</strong> {{ vacancy.publication_date || 'N/A' }}</p>
        <p><strong>Контактный email:</strong> {{ vacancy.contact_email || 'N/A' }}</p>
        <p><strong>Дата создания:</strong> {{ vacancy.created_at || 'N/A' }}</p>
      </div>
      <div class="action-buttons">
        <button class="btn-secondary" @click="$router.push('/vacancies')">Вернуться к списку</button>
      </div>
    </div>
    <div v-else class="error-message">Не удалось загрузить данные о вакансии.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vacancy: null,
      loading: true,
      errorMessage: null,
      backendUrl: 'http://localhost:3000',
    };
  },
  async created() {
    const vacancyId = this.$route.params.id;
    if (!/^\d+$/.test(vacancyId)) {
      this.errorMessage = 'Некорректный ID';
      this.loading = false;
      return;
    }
    await this.fetchVacancy(vacancyId);
  },
  methods: {
    async fetchVacancy(vacancyId) {
      try {
        const response = await fetch(`${this.backendUrl}/api/vacancies/${vacancyId}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          if (response.status === 401) {
            this.$router.push('/login');
            return;
          }
          if (response.status === 404) {
            throw new Error('Вакансия не найдена');
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        this.vacancy = data;
      } catch (err) {
        console.error('Ошибка при получении данных вакансии:', err);
        this.errorMessage = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.vacancy-details {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  padding: 20px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.product-image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.product-image-container .product-image {
  max-width: 150px;
  max-height: 150px;
  border-radius: 8px;
  object-fit: cover;
}

.vacancy-info {
  text-align: center;
  width: 100%;
  word-wrap: break-word;
}

.vacancy-info p {
  margin: 10px 0;
  font-size: 1.25rem;
}

.vacancy-info strong {
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.loading-message,
.error-message {
  text-align: center;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .vacancy-details {
    padding: 15px;
  }

  .product-image-container .product-image {
    max-width: 120px;
    max-height: 120px;
  }

  .vacancy-info p {
    font-size: 1rem;
  }
}
</style>