using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class AgregaAgenda : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Agendas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProfesionalId = table.Column<int>(type: "int", nullable: false),
                    Dias = table.Column<int>(type: "int", nullable: false),
                    Desde = table.Column<TimeOnly>(type: "time", nullable: false),
                    Hasta = table.Column<TimeOnly>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Agendas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Agendas_Profesionales_ProfesionalId",
                        column: x => x.ProfesionalId,
                        principalTable: "Profesionales",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AgendaServiciosDelProfesional",
                columns: table => new
                {
                    AgendasId = table.Column<int>(type: "int", nullable: false),
                    ServiciosId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AgendaServiciosDelProfesional", x => new { x.AgendasId, x.ServiciosId });
                    table.ForeignKey(
                        name: "FK_AgendaServiciosDelProfesional_Agendas_AgendasId",
                        column: x => x.AgendasId,
                        principalTable: "Agendas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_AgendaServiciosDelProfesional_ServiciosDelProfesional_ServiciosId",
                        column: x => x.ServiciosId,
                        principalTable: "ServiciosDelProfesional",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Agendas_ProfesionalId",
                table: "Agendas",
                column: "ProfesionalId");

            migrationBuilder.CreateIndex(
                name: "IX_AgendaServiciosDelProfesional_ServiciosId",
                table: "AgendaServiciosDelProfesional",
                column: "ServiciosId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AgendaServiciosDelProfesional");

            migrationBuilder.DropTable(
                name: "Agendas");
        }
    }
}
