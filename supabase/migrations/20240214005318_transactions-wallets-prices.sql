create table "public"."historical_prices" (
    "date" timestamp with time zone,
    "open" double precision,
    "high" double precision,
    "low" double precision,
    "close" double precision,
    "adj_close" double precision,
    "volume" bigint,
    "id" uuid not null default gen_random_uuid(),
    "currency" text default ''::text
);


alter table "public"."historical_prices" enable row level security;

create table "public"."transactions" (
    "id" uuid not null default gen_random_uuid(),
    "updated_at" timestamp with time zone,
    "wallet_id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "type" character varying not null,
    "amount" numeric not null,
    "price_per_asset" numeric not null,
    "date" timestamp with time zone not null default now(),
    "note" text,
    "asset" character varying
);


alter table "public"."transactions" enable row level security;

create table "public"."wallets" (
    "id" uuid not null default gen_random_uuid(),
    "name" character varying not null,
    "updated_at" timestamp with time zone,
    "created_at" timestamp with time zone not null default now(),
    "profile_id" uuid not null
);


CREATE UNIQUE INDEX historical_prices_id_key ON public.historical_prices USING btree (id);

CREATE UNIQUE INDEX historical_prices_pkey ON public.historical_prices USING btree (id);

CREATE UNIQUE INDEX transactions_pkey ON public.transactions USING btree (id);

CREATE UNIQUE INDEX wallet_pkey ON public.wallets USING btree (id);

alter table "public"."historical_prices" add constraint "historical_prices_pkey" PRIMARY KEY using index "historical_prices_pkey";

alter table "public"."transactions" add constraint "transactions_pkey" PRIMARY KEY using index "transactions_pkey";

alter table "public"."wallets" add constraint "wallet_pkey" PRIMARY KEY using index "wallet_pkey";

alter table "public"."historical_prices" add constraint "historical_prices_id_key" UNIQUE using index "historical_prices_id_key";

alter table "public"."transactions" add constraint "transactions_wallet_id_fkey" FOREIGN KEY (wallet_id) REFERENCES wallets(id) ON DELETE CASCADE not valid;

alter table "public"."transactions" validate constraint "transactions_wallet_id_fkey";

alter table "public"."wallets" add constraint "wallets_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."wallets" validate constraint "wallets_profile_id_fkey";

grant delete on table "public"."historical_prices" to "anon";

grant insert on table "public"."historical_prices" to "anon";

grant references on table "public"."historical_prices" to "anon";

grant select on table "public"."historical_prices" to "anon";

grant trigger on table "public"."historical_prices" to "anon";

grant truncate on table "public"."historical_prices" to "anon";

grant update on table "public"."historical_prices" to "anon";

grant delete on table "public"."historical_prices" to "authenticated";

grant insert on table "public"."historical_prices" to "authenticated";

grant references on table "public"."historical_prices" to "authenticated";

grant select on table "public"."historical_prices" to "authenticated";

grant trigger on table "public"."historical_prices" to "authenticated";

grant truncate on table "public"."historical_prices" to "authenticated";

grant update on table "public"."historical_prices" to "authenticated";

grant delete on table "public"."historical_prices" to "service_role";

grant insert on table "public"."historical_prices" to "service_role";

grant references on table "public"."historical_prices" to "service_role";

grant select on table "public"."historical_prices" to "service_role";

grant trigger on table "public"."historical_prices" to "service_role";

grant truncate on table "public"."historical_prices" to "service_role";

grant update on table "public"."historical_prices" to "service_role";

grant delete on table "public"."transactions" to "anon";

grant insert on table "public"."transactions" to "anon";

grant references on table "public"."transactions" to "anon";

grant select on table "public"."transactions" to "anon";

grant trigger on table "public"."transactions" to "anon";

grant truncate on table "public"."transactions" to "anon";

grant update on table "public"."transactions" to "anon";

grant delete on table "public"."transactions" to "authenticated";

grant insert on table "public"."transactions" to "authenticated";

grant references on table "public"."transactions" to "authenticated";

grant select on table "public"."transactions" to "authenticated";

grant trigger on table "public"."transactions" to "authenticated";

grant truncate on table "public"."transactions" to "authenticated";

grant update on table "public"."transactions" to "authenticated";

grant delete on table "public"."transactions" to "service_role";

grant insert on table "public"."transactions" to "service_role";

grant references on table "public"."transactions" to "service_role";

grant select on table "public"."transactions" to "service_role";

grant trigger on table "public"."transactions" to "service_role";

grant truncate on table "public"."transactions" to "service_role";

grant update on table "public"."transactions" to "service_role";

grant delete on table "public"."wallets" to "anon";

grant insert on table "public"."wallets" to "anon";

grant references on table "public"."wallets" to "anon";

grant select on table "public"."wallets" to "anon";

grant trigger on table "public"."wallets" to "anon";

grant truncate on table "public"."wallets" to "anon";

grant update on table "public"."wallets" to "anon";

grant delete on table "public"."wallets" to "authenticated";

grant insert on table "public"."wallets" to "authenticated";

grant references on table "public"."wallets" to "authenticated";

grant select on table "public"."wallets" to "authenticated";

grant trigger on table "public"."wallets" to "authenticated";

grant truncate on table "public"."wallets" to "authenticated";

grant update on table "public"."wallets" to "authenticated";

grant delete on table "public"."wallets" to "service_role";

grant insert on table "public"."wallets" to "service_role";

grant references on table "public"."wallets" to "service_role";

grant select on table "public"."wallets" to "service_role";

grant trigger on table "public"."wallets" to "service_role";

grant truncate on table "public"."wallets" to "service_role";

grant update on table "public"."wallets" to "service_role";

create policy "Enable read access for all users"
on "public"."historical_prices"
as permissive
for select
to public
using (true);



