<template>
  <div class="app-container">
    <h1 class="page-title">Просмотр соискателя</h1>
    <div v-if="loading" class="loading-message">Загрузка данных...</div>
    <div v-else-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-else-if="applicant" class="applicant-details">
      <div class="product-image-container">
        <img v-if="applicant.photo" :src="`${backendUrl}${applicant.photo}`" alt="Applicant Photo" class="product-image" />
        <span v-else>Нет изображения</span>
      </div>
      <div class="applicant-info">
        <p><strong>ФИО:</strong> {{ applicant.full_name || 'N/A' }}</p>
        <p><strong>Дата рождения:</strong> {{ applicant.birth_date || 'N/A' }}</p>
        <p><strong>Образование:</strong> {{ applicant.education || 'N/A' }}</p>
        <p><strong>Опыт (лет):</strong> {{ applicant.experience_years ?? 'N/A' }}</p>
        <p><strong>Телефон:</strong> {{ applicant.contact_phone || 'N/A' }}</p>
        <p><strong>Email:</strong> {{ applicant.email || 'N/A' }}</p>
        <p><strong>Желаемая должность:</strong> {{ applicant.desired_position || 'N/A' }}</p>
        <p><strong>Дата регистрации:</strong> {{ applicant.registration_date || 'N/A' }}</p>
        <p><strong>Дата создания:</strong> {{ applicant.created_at || 'N/A' }}</p>
      </div>
      <div class="action-buttons">
        <button class="btn-secondary" @click="$router.push('/applicants')">Вернуться к списку</button>
      </div>
    </div>
    <div v-else class="error-message">Не удалось загрузить данные о соискателе.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      applicant: null,
      loading: true,
      errorMessage: null,
      backendUrl: 'http://localhost:3000',
    };
  },
  async created() {
    const applicantId = this.$route.params.id;
    if (!/^\d+$/.test(applicantId)) {
      this.errorMessage = 'Некорректный ID';
      this.loading = false;
      return;
    }
    await this.fetchApplicant(applicantId);
  },
  methods: {
    async fetchApplicant(applicantId) {
      try {
        const response = await fetch(`${this.backendUrl}/api/applicants/${applicantId}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          if (response.status === 401) {
            this.$router.push('/login');
            return;
          }
          if (response.status === 404) {
            throw new Error('Соискатель не найден');
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        this.applicant = data;
      } catch (err) {
        console.error('Ошибка при получении данных соискателя:', err);
        this.errorMessage = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.applicant-details {
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

.applicant-info {
  text-align: center;
  width: 100%;
  word-wrap: break-word;
}

.applicant-info p {
  margin: 10px 0;
  font-size: 1.25rem;
}

.applicant-info strong {
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
  .applicant-details {
    padding: 15px;
  }

  .product-image-container .product-image {
    max-width: 120px;
    max-height: 120px;
  }

  .applicant-info p {
    font-size: 1rem;
  }
}
</style>