﻿// <auto-generated />
using System;
using Api.Persistencia._Config;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Api.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Api.Core.Entidades.CategoriaDeServicio", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Descripcion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("CategoriaDeServicio");
                });

            modelBuilder.Entity("Api.Core.Entidades.Profesional", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Apellido")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Telefono")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Profesionales");
                });

            modelBuilder.Entity("Api.Core.Entidades.Servicio", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CategoriaDeServicioId")
                        .HasColumnType("int");

                    b.Property<string>("Descripcion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("DuracionDelTurnoPorDefectoEnMinutos")
                        .HasColumnType("int");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PrecioPorDefecto")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CategoriaDeServicioId");

                    b.ToTable("Servicios");
                });

            modelBuilder.Entity("Api.Core.Entidades.ServiciosDelProfesional", b =>
                {
                    b.Property<int>("ProfesionalId")
                        .HasColumnType("int");

                    b.Property<int>("ServicioId")
                        .HasColumnType("int");

                    b.Property<int?>("DuracionDelTurnoEnMinutos")
                        .HasColumnType("int");

                    b.Property<int?>("Precio")
                        .HasColumnType("int");

                    b.HasKey("ProfesionalId", "ServicioId");

                    b.HasIndex("ServicioId");

                    b.ToTable("ServiciosDelProfesional");
                });

            modelBuilder.Entity("Api.Core.Entidades.Servicio", b =>
                {
                    b.HasOne("Api.Core.Entidades.CategoriaDeServicio", "CategoriaDeServicio")
                        .WithMany("Servicios")
                        .HasForeignKey("CategoriaDeServicioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CategoriaDeServicio");
                });

            modelBuilder.Entity("Api.Core.Entidades.ServiciosDelProfesional", b =>
                {
                    b.HasOne("Api.Core.Entidades.Profesional", null)
                        .WithMany("ServiciosDelProfesional")
                        .HasForeignKey("ProfesionalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Api.Core.Entidades.Servicio", null)
                        .WithMany("ProfesionalesQueLoBrindan")
                        .HasForeignKey("ServicioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Api.Core.Entidades.CategoriaDeServicio", b =>
                {
                    b.Navigation("Servicios");
                });

            modelBuilder.Entity("Api.Core.Entidades.Profesional", b =>
                {
                    b.Navigation("ServiciosDelProfesional");
                });

            modelBuilder.Entity("Api.Core.Entidades.Servicio", b =>
                {
                    b.Navigation("ProfesionalesQueLoBrindan");
                });
#pragma warning restore 612, 618
        }
    }
}
