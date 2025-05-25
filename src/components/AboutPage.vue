<template>
  <main>
    <div class="container">
      <h1 class="page-title">О нашем Центре занятости</h1>

      <!-- Блок 1: Миссия и цели -->
      <div class="content-block fade-in" ref="block1">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="md:w-1/2 text-block">
            <h2 class="text-2xl font-bold mb-4">Миссия и цели</h2>
            <p class="fs-5">
              Мы стремимся помочь каждому найти достойную работу, соответствующую навыкам и амбициям, обеспечивая поддержку на всех этапах трудоустройства.
            </p>
          </div>
          <div class="md:w-1/2 image-block">
            <img src="/images/11.png" alt="Миссия и цели" class="img-block">
          </div>
        </div>
      </div>

      <!-- Блок 2: Профессиональная поддержка -->
      <div class="content-block fade-in" ref="block2">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="md:w-1/2 image-block order-2 md:order-1">
            <img src="/images/22.jpg" alt="Профессиональная поддержка" class="img-block">
          </div>
          <div class="md:w-1/2 text-block order-1 md:order-2">
            <h2 class="text-2xl font-bold mb-4">Профессиональная поддержка</h2>
            <p class="fs-5">
              Наши консультанты предоставляют индивидуальные консультации, помогая составить резюме, подготовиться к собеседованию и выбрать подходящую вакансию.
            </p>
          </div>
        </div>
      </div>

      <!-- Блок 3: Обучение и развитие -->
      <div class="content-block fade-in" ref="block3">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="md:w-1/2 text-block">
            <h2 class="text-2xl font-bold mb-4">Обучение и развитие</h2>
            <p class="fs-5">
              Организуем тренинги, курсы и семинары для повышения квалификации и освоения новых профессиональных навыков.
            </p>
          </div>
          <div class="md:w-1/2 image-block">
            <img src="/images/33.png" alt="Обучение и развитие" class="img-block">
          </div>
        </div>
      </div>

      <!-- Блок 4: Сотрудничество с работодателями -->
      <div class="content-block fade-in" ref="block4">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="md:w-1/2 image-block order-2 md:order-1">
            <img src="/images/44.jpg" alt="Сотрудничество с работодателями" class="img-block">
          </div>
          <div class="md:w-1/2 text-block order-1 md:order-2">
            <h2 class="text-2xl font-bold mb-4">Сотрудничество с работодателями</h2>
            <p class="fs-5">
              Партнерство с ведущими компаниями позволяет предлагать актуальные вакансии в различных отраслях.
            </p>
          </div>
        </div>
      </div>

      <!-- Блок 5: Социальная ответственность -->
      <div class="content-block fade-in" ref="block5">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="md:w-1/2 text-block">
            <h2 class="text-2xl font-bold mb-4">Социальная ответственность</h2>
            <p class="fs-5">
              Поддерживаем программы трудоустройства для молодежи, людей с ограниченными возможностями и других уязвимых групп.
            </p>
          </div>
          <div class="md:w-1/2 image-block">
            <img src="/images/55.jpg" alt="Социальная ответственность" class="img-block">
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'AboutPage',
  mounted() {
    try {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      this.$el.querySelectorAll('.fade-in').forEach((el) => {
        observer.observe(el);
      });
    } catch (err) {
      console.error('Error setting up IntersectionObserver:', err);
    }
  }
}
</script>

<style scoped>
body {
  background: #e5e7eb;
  min-height: 100vh;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 2rem;
  text-align: center;
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.fs-5 {
  font-size: 1.25rem;
  color: #4b5563;
}

.text-center {
  text-align: center;
}

.content-block {
  margin-bottom: 3rem;
}

.text-block {
  background: #ffffff;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.text-2xl {
  font-size: 1.5rem;
  color: #1f2937;
}

.font-bold {
  font-weight: 700;
}

.mb-4 {
  margin-bottom: 1rem;
}

.image-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.img-block {
  max-width: 500px;
  border-radius: 0.25rem;
  border: 1px solid #e5e7eb;
}

.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 640px) {
  .container {
    padding: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .img-block {
    max-width: 120px;
  }

  .fs-5 {
    font-size: 1rem;
  }

  .text-2xl {
    font-size: 1.25rem;
  }
}
</style>