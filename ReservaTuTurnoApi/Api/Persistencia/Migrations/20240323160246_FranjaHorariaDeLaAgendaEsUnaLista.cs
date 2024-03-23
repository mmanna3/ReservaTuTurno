using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class FranjaHorariaDeLaAgendaEsUnaLista : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Desde",
                table: "Agendas");

            migrationBuilder.DropColumn(
                name: "Hasta",
                table: "Agendas");

            migrationBuilder.CreateTable(
                name: "FranjaHoraria",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AgendaId = table.Column<int>(type: "int", nullable: false),
                    Desde = table.Column<TimeOnly>(type: "time", nullable: false),
                    Hasta = table.Column<TimeOnly>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FranjaHoraria", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FranjaHoraria_Agendas_AgendaId",
                        column: x => x.AgendaId,
                        principalTable: "Agendas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FranjaHoraria_AgendaId",
                table: "FranjaHoraria",
                column: "AgendaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FranjaHoraria");

            migrationBuilder.AddColumn<TimeOnly>(
                name: "Desde",
                table: "Agendas",
                type: "time",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0));

            migrationBuilder.AddColumn<TimeOnly>(
                name: "Hasta",
                table: "Agendas",
                type: "time",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0));
        }
    }
}
