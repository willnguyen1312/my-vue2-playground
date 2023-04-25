<template>
  <div>
    <RouterLink to="/" data-testid="home-link">Home</RouterLink>
    <RouterLink to="/about" data-testid="about-link">About</RouterLink>
    <RouterLink to="/store" data-testid="store-link">Store</RouterLink>
    <RouterLink to="/data" data-testid="fetch-link">Data</RouterLink>
    <RouterView />
    <div data-testid="location-display">{{ $route.fullPath }}</div>
  </div>
</template>
