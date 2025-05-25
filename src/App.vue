<template>
  <header>
    <div class="wrapper">
      <router-view></router-view>
    </div>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  </header>
  <main>
    <TheWelcome />
  </main>
  <aside class="right-panel">
    <div class="logo-container">
      <router-link to="/">
        <img src="/images/logo.png" alt="Logo" class="logo" />
      </router-link>
    </div>
    <nav class="nav-buttons">
      <ul class="button-list">
        <li><router-link to="/" class="button">Главная</router-link></li>
        <li><router-link to="/about" class="button">О нас</router-link></li>
        <li><router-link to="/contact" class="button">Контакты</router-link></li>
        <li v-if="isAuthenticated"><router-link to="/applicants" class="button">Соискатели</router-link></li>
        <li v-if="isAuthenticated"><router-link to="/vacancies" class="button">Вакансии</router-link></li>
        <li v-if="!isAuthenticated"><router-link to="/login" class="button">Войти</router-link></li>
        <li v-if="!isAuthenticated"><router-link to="/register" class="button">Зарегистрироваться</router-link></li>
        <li v-if="isAuthenticated" class="welcome-message"><span>Добро пожаловать, {{ username }}</span></li>
        <li v-if="isAuthenticated"><button @click="logout" class="button">Выйти</button></li>
        <li v-if="isAuthenticated && role === 'admin'"><a href="http://localhost:3000" class="admin-button">Админ-панель</a></li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: false,
      username: '',
      role: ''
    };
  },
  created() {
    this.checkAuth();
  },
  methods: {
    async checkAuth() {
      try {
        const response = await fetch('http://localhost:3000/auth/check', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();

        if (response.ok) {
          this.isAuthenticated = true;
          this.username = data.username || 'Пользователь';
          this.role = data.role || '';
        } else {
          console.error('Токен недействителен:', data.message);
          this.isAuthenticated = false;
          this.username = '';
          this.role = '';
        }
      } catch (err) {
        console.error('Ошибка проверки авторизации:', err);
        this.isAuthenticated = false;
        this.username = '';
        this.role = '';
      }
    },
    async logout() {
      try {
        const response = await fetch('http://localhost:3000/auth/logout', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          this.isAuthenticated = false;
          this.username = '';
          this.role = '';
          this.$router.push('/');
        } else {
          console.error('Сервер вернул ошибку при выходе');
        }
      } catch (err) {
        console.error('Ошибка выхода:', err);
        this.isAuthenticated = false;
        this.username = '';
        this.role = '';
        this.$router.push('/');
      }
    }
  }
};
</script>

<style scoped>
/* Боковая панель */
.right-panel {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.95); /* Полупрозрачный белый фон */
  backdrop-filter: blur(10px);
  border-left: 1px solid rgba(46, 125, 50, 0.3); /* Зеленая граница */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Логотип */
.logo-container {
  display: flex;
  justify-content: center;
}

.logo {
  max-width: 100px;
  height: auto;
  border-radius: 5px;
  border: 2px solid #e8f5e9; /* Очень светло-зеленый бордер */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
  border-color: #4caf50; /* Яркий зеленый */
}

/* Список кнопок */
.button-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

/* Общие стили для кнопок навигации */
.button {
  display: block;
  width: 180px;
  padding: 10px 15px;
  background: #2e7d32; /* Зеленый фон */
  color: #ffffff; /* Белый текст */
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.button:hover {
  background: #1b5e20; /* Темно-зеленый при ховере */
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

/* Кнопка админ-панели */
.admin-button {
  display: block;
  width: 200px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #4caf50, #2e7d32); /* Яркий зеленый градиент */
  color: #ffffff;
  text-decoration: none;
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  border: 2px solid #ffffff; /* Белый бордер для акцента */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  position: relative;
  overflow: hidden;
}

.admin-button:hover {
  background: linear-gradient(135deg, #2e7d32, #4caf50);
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  border-color: #e8f5e9; /* Светло-зеленый бордер */
}

.admin-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.4s ease, height 0.4s ease;
}

.admin-button:hover::after {
  width: 300px;
  height: 300px;
}

/* Приветственное сообщение */
.welcome-message span {
  display: block;
  width: auto;
  padding: 10px 15px;
  font-size: 16px;
  color: #1a3c34; /* Темно-зеленый текст */
  font-weight: 600;
  text-align: center;
  background: rgba(232, 245, 233, 0.2); /* Полупрозрачный зеленый фон */
  border-radius: 8px;
}

/* Адаптивность */
@media (max-width: 768px) {
  .right-panel {
    padding: 15px;
    width: 160px;
  }

  .logo {
    max-width: 80px;
  }

  .button {
    width: 140px;
    padding: 8px 10px;
    font-size: 0.9rem;
  }

  .admin-button {
    width: 150px;
    padding: 10px 15px;
    font-size: 1rem;
  }

  .welcome-message span {
    padding: 8px 10px;
    font-size: 0.9rem;
  }
}
</style>