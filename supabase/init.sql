-- Crear la tabla de perfiles
create table public.profiles (
  id uuid references auth.users on delete cascade,
  nombre text,
  apellido text,
  telefono text,
  direccion text,
  ciudad text,
  codigo_postal text,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Habilitar RLS (Row Level Security)
alter table public.profiles enable row level security;

-- Crear políticas de seguridad
create policy "Los usuarios pueden ver su propio perfil."
  on public.profiles for select
  using ( auth.uid() = id );

create policy "Los usuarios pueden insertar su propio perfil."
  on public.profiles for insert 
  with check ( auth.uid() = id OR auth.role() = 'authenticated' );

create policy "Los usuarios pueden actualizar su propio perfil."
  on public.profiles for update
  using ( auth.uid() = id );

-- Crear la tabla de mascotas
create table public.pets (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.profiles(id) on delete cascade,
  nombre text,
  especie text,
  raza text,
  edad integer,
  peso numeric(5,2),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS para mascotas
alter table public.pets enable row level security;

-- Crear políticas para mascotas
create policy "Los usuarios pueden ver sus propias mascotas."
  on public.pets for select
  using ( auth.uid() = owner_id );

create policy "Los usuarios pueden crear mascotas."
  on public.pets for insert
  with check ( auth.uid() = owner_id );

create policy "Los usuarios pueden actualizar sus propias mascotas."
  on public.pets for update
  using ( auth.uid() = owner_id );

-- Crear la tabla de servicios
create table public.services (
  id uuid default uuid_generate_v4() primary key,
  pet_id uuid references public.pets(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  tipo_servicio text,
  fecha timestamp with time zone,
  estado text,
  notas text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS para servicios
alter table public.services enable row level security;

-- Crear políticas para servicios
create policy "Los usuarios pueden ver sus propios servicios."
  on public.services for select
  using ( auth.uid() = user_id );

create policy "Los usuarios pueden crear servicios."
  on public.services for insert
  with check ( auth.uid() = user_id );

create policy "Los usuarios pueden actualizar sus propios servicios."
  on public.services for update
  using ( auth.uid() = user_id );
