<template>
  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <div class="app-container">
      <h1 class="page-title">Список вакансий</h1>
      <div class="table-container">
        <table class="styled-table vacancies-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Название вакансии</th>
              <th>Компания</th>
              <th>Зарплата</th>
              <th>График работы</th>
              <th>Местоположение</th>
              <th>Требуемый опыт</th>
              <th>Дата публикации</th>
              <th>Контактный email</th>
              <th>Фото</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in vacancies" :key="item.id">
              <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
              <td>{{ item.job_title || 'N/A' }}</td>
              <td>{{ item.company_name || 'N/A' }}</td>
              <td>{{ item.salary ? `${item.salary} ₽` : 'N/A' }}</td>
              <td>{{ item.work_schedule || 'N/A' }}</td>
              <td>{{ item.location || 'N/A' }}</td>
              <td>{{ item.required_experience ?? 'N/A' }}</td>
              <td>{{ item.publication_date || 'N/A' }}</td>
              <td>{{ item.contact_email || 'N/A' }}</td>
              <td>
                <img v-if="item.photo" :src="`${backendUrl}${item.photo}`" alt="Vacancy Photo" class="product-image" />
                <span v-else>N/A</span>
              </td>
              <td>
                <div class="action-buttons">
                  <router-link :to="`/view-vacancies/${item.id}`" class="action-btn view-icon"><i class="fas fa-eye"></i></router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="!vacancies.length" class="no-data">Нет вакансий</p>
        <div class="pagination" v-if="totalPages > 1">
          <button @click="prevPage" :disabled="currentPage === 1">← Предыдущая</button>
          <span>Страница {{ currentPage }} из {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">Следующая →</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vacancies: [],
      currentPage: 1,
      totalPages: 0,
      pageSize: 10,
      backendUrl: 'https://mnode.onrender.com',
    };
  },
  async created() {
    await this.fetchVacancies();
  },
  methods: {
    async fetchVacancies() {
      try {
        const response = await fetch(`${this.backendUrl}/api/vacancies?page=${this.currentPage}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          if (response.status === 401) {
            this.$router.push('/login');
            return;
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        this.vacancies = data.vacancies || [];
        this.totalPages = data.totalPages || 0;
        this.currentPage = data.currentPage || 1;
      } catch (err) {
        console.error('Error fetching vacancies:', err);
        this.vacancies = [];
        this.totalPages = 0;
      }
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        await this.fetchVacancies();
      }
    },
    async nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        await this.fetchVacancies();
      }
    },
  },
};
</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', sans-serif;
}

.page-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: white;
}

.btn-primary {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
}

.table-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.styled-table.vacancies-table {
  width: 100%;
  min-width: 600px;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
}

.styled-table.vacancies-table th,
.styled-table.vacancies-table td {
  padding: 10px 8px;
  text-align: center;
  vertical-align: middle;
  white-space: normal;
  word-break: break-word;
  font-size: 0.85rem;
}

.styled-table.vacancies-table th {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.styled-table.vacancies-table tbody tr:nth-child(even) {
  background: rgba(255, 255, 255, 0.7);
}

.styled-table.vacancies-table tbody tr:hover {
  transition: background 0.3s ease;
}

.product-image {
  max-width: 50px;
  max-height: 50px;
  border-radius: 8px;
  object-fit: cover;
  vertical-align: middle;
}

.no-data {
  text-align: center;
  font-size: 1.2rem;
  padding: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
  padding: 20px 0;
}

.pagination button {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
}

.pagination button:disabled {
  cursor: not-allowed;
  box-shadow: none;
}

.pagination button:hover:not(:disabled) {
  transform: scale(1.05);
}

.pagination span {
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1rem;
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
}

@media (max-width: 768px) {
  .app-container {
    padding: 15px;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .table-container {
    padding: 10px;
  }

  .styled-table.vacancies-table th,
  .styled-table.vacancies-table td {
    padding: 6px;
    font-size: 0.8rem;
  }

  .vacancies-table th,
  .vacancies-table td {
    min-width: 30px;
  }

  .product-image {
    max-width: 40px;
    max-height: 40px;
  }

  .pagination button {
    padding: 8px 15px;
    font-size: 0.9rem;
  }

  .action-btn {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }
}
</style>
