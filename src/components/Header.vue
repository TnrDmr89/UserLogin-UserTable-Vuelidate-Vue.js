<template>
    <nav class="navbar bg-primary navbar-expand-lg" data-bs-theme="dark">
        <div class="container-fluid">
            <div class="navbar-brand">KULLANICI BİLGİSİ</div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <router-link class="nav-item" tag="li" to="/login">
                        <a class="nav-link">Login</a>
                    </router-link>
                    <router-link class="nav-item" tag="li" to="/table">
                        <a class="nav-link">User Table</a>
                    </router-link>
                </ul>
            </div>
        </div>
    </nav>
</template>


<script>

</script>

<style></style>