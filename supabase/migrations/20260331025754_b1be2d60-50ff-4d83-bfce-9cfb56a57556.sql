
-- User roles enum and table
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS: admins can view all roles
CREATE POLICY "Admins can view all roles" ON public.user_roles
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Products table for admin management
CREATE TABLE public.db_products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    brand text NOT NULL,
    category text NOT NULL,
    price numeric NOT NULL,
    original_price numeric,
    rating numeric DEFAULT 0,
    review_count integer DEFAULT 0,
    image text NOT NULL,
    images jsonb DEFAULT '[]'::jsonb,
    description text NOT NULL DEFAULT '',
    short_description text DEFAULT '',
    specs jsonb DEFAULT '{}'::jsonb,
    in_stock boolean DEFAULT true,
    badge text,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.db_products ENABLE ROW LEVEL SECURITY;

-- Anyone can view products
CREATE POLICY "Anyone can view products" ON public.db_products
FOR SELECT USING (true);

-- Admins can manage products
CREATE POLICY "Admins can insert products" ON public.db_products
FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update products" ON public.db_products
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete products" ON public.db_products
FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can view all orders
CREATE POLICY "Admins can view all orders" ON public.orders
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update orders
CREATE POLICY "Admins can update orders" ON public.orders
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at on db_products
CREATE TRIGGER update_db_products_updated_at
BEFORE UPDATE ON public.db_products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
