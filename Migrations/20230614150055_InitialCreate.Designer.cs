﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NewTodoApi.Models;

#nullable disable

namespace NewTodoApi.Migrations
{
    [DbContext(typeof(TodoContext))]
    [Migration("20230614150055_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("NewTodoApi.Models.TodoItem", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<DateTime>("Deadline")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsComplete")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("Priority")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("TaskCreated")
                        .HasColumnType("datetime2");

                    b.Property<int?>("userid")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("userid");

                    b.ToTable("TodoItems");
                });

            modelBuilder.Entity("NewTodoApi.Models.User", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<string>("email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("isLoggedIn")
                        .HasColumnType("bit");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("NewTodoApi.Models.TodoItem", b =>
                {
                    b.HasOne("NewTodoApi.Models.User", "user")
                        .WithMany("todoItems")
                        .HasForeignKey("userid");

                    b.Navigation("user");
                });

            modelBuilder.Entity("NewTodoApi.Models.User", b =>
                {
                    b.Navigation("todoItems");
                });
#pragma warning restore 612, 618
        }
    }
}